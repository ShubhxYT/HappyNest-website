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


class LeadRequest(BaseModel):
    timestamp: str
    full_name: str = Field(min_length=1, max_length=500)
    phone: str | None = None
    email: str | None = None
    check_in: str | None = None
    check_out: str | None = None
    guests: int | None = None
    children: int | None = None
    pets: int | None = None
    budget: str | None = None
    special_requests: str | None = None
    source: str | None = None


class LeadResponse(BaseModel):
    ok: bool
    id: str | None = None
    error: str | None = None


class HealthResponse(BaseModel):
    status: Literal["ok"]
    version: str