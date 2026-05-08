"""Pydantic schemas for the FastAPI chat endpoints."""

from __future__ import annotations

from typing import Literal

from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    """Body sent by the Next.js proxy."""

    session_id: str | None = Field(
        default=None,
        description="Existing chat session UUID. If null, a new session is created.",
    )
    question: str = Field(min_length=1, max_length=4000)


class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str
    created_at: str


class HistoryResponse(BaseModel):
    session_id: str
    messages: list[ChatMessage]


class HealthResponse(BaseModel):
    status: Literal["ok"]
    version: str