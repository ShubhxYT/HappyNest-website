"""FastAPI app exposing the CAG chatbot over SSE.

Wire format (every SSE `data:` line is JSON):
    {"type": "session", "session_id": "<uuid>"}    -- always first
    {"type": "chunk",   "content":    "<text>"}    -- 0..N
    {"type": "done"}                                -- terminal success
    {"type": "error",   "message":    "<text>"}    -- terminal failure
"""

from __future__ import annotations

import json
import logging
from typing import AsyncIterator

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from starlette.concurrency import iterate_in_threadpool

from cag_agent import __version__
from cag_agent.config import Settings
from cag_agent.db import create_session, get_history, insert_message
from cag_agent.llm import LLMClient
from cag_agent.schemas import (
    ChatMessage,
    ChatRequest,
    HealthResponse,
    HistoryResponse,
)

logger = logging.getLogger(__name__)

settings = Settings()
app = FastAPI(title="HappyNest CAG Agent", version=__version__)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

_llm_client: LLMClient | None = None


def get_llm() -> LLMClient:
    global _llm_client
    if _llm_client is None:
        _llm_client = LLMClient(settings)
    return _llm_client


def _sse(payload: dict) -> bytes:
    return f"data: {json.dumps(payload, ensure_ascii=False)}\n\n".encode("utf-8")


@app.get("/health", response_model=HealthResponse)
def health() -> HealthResponse:
    return HealthResponse(status="ok", version=__version__)


@app.post("/chat/stream")
async def chat_stream(req: ChatRequest, request: Request) -> StreamingResponse:
    question = req.question.strip()
    if not question:
        raise HTTPException(status_code=400, detail="Empty question")

    session_id = req.session_id
    user_agent = request.headers.get("user-agent")

    if not session_id:
        try:
            session_id = create_session(user_agent=user_agent)
        except Exception as exc:
            logger.exception("create_session failed")
            raise HTTPException(
                status_code=503,
                detail=f"Persistence unavailable: {exc}",
            ) from exc

    insert_message(session_id, "user", question)

    async def event_stream() -> AsyncIterator[bytes]:
        yield _sse({"type": "session", "session_id": session_id})

        full_answer_parts: list[str] = []
        try:
            llm = get_llm()
            sync_gen = llm.ask_stream(question)
            async for chunk in iterate_in_threadpool(sync_gen):
                if not chunk:
                    continue
                full_answer_parts.append(chunk)
                yield _sse({"type": "chunk", "content": chunk})
        except Exception as exc:
            logger.exception("LLM stream failed")
            yield _sse({"type": "error", "message": str(exc)})
            return

        full_answer = "".join(full_answer_parts).strip()
        if full_answer:
            insert_message(session_id, "assistant", full_answer)
        yield _sse({"type": "done"})

    return StreamingResponse(
        event_stream(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache, no-transform",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    )


@app.get("/chat/history/{session_id}", response_model=HistoryResponse)
def chat_history(session_id: str) -> HistoryResponse:
    rows = get_history(session_id)
    return HistoryResponse(
        session_id=session_id,
        messages=[ChatMessage(**row) for row in rows],
    )