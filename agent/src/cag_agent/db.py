"""Thin Supabase client wrapper for chat persistence.

All access is server-side using the service role key. RLS can stay disabled
on `chat_sessions` and `chat_messages` because the only writer is this
trusted backend.
"""

from __future__ import annotations

import logging
from functools import lru_cache

from supabase import Client, create_client

from cag_agent.config import Settings

logger = logging.getLogger(__name__)


@lru_cache(maxsize=1)
def _client() -> Client:
    settings = Settings()
    if not settings.supabase_url or not settings.SUPABASE_KEY:
        raise RuntimeError(
            "SUPABASE_URL and SUPABASE_KEY must be set "
            "to use the chat persistence layer."
        )
    return create_client(
        settings.supabase_url,
        settings.SUPABASE_KEY,
    )


def create_session(
    user_agent: str | None = None,
    ip_hash: str | None = None,
) -> str:
    """Insert a new chat session row and return its UUID as a string."""
    payload: dict[str, str] = {}
    if user_agent:
        payload["user_agent"] = user_agent[:500]
    if ip_hash:
        payload["ip_hash"] = ip_hash[:128]

    res = _client().table("chat_sessions").insert(payload).execute()
    if not res.data:
        raise RuntimeError("Failed to create chat session in Supabase")
    return str(res.data[0]["id"])


def insert_message(session_id: str, role: str, content: str) -> None:
    """Persist a single chat message. Errors are logged but never raised
    to the streaming path — losing a write must not break the user reply."""
    if role not in ("user", "assistant"):
        raise ValueError(f"Invalid role: {role!r}")
    try:
        _client().table("chat_messages").insert(
            {
                "session_id": session_id,
                "role": role,
                "content": content,
            }
        ).execute()
    except Exception as exc:  # pragma: no cover - network/auth errors
        logger.exception("Failed to persist chat message: %s", exc)


def get_history(session_id: str) -> list[dict]:
    """Return ordered messages for a session (oldest first)."""
    res = (
        _client()
        .table("chat_messages")
        .select("role, content, created_at")
        .eq("session_id", session_id)
        .order("created_at", desc=False)
        .execute()
    )
    return res.data or []


def insert_lead(data: dict) -> str:
    """Insert a lead into happynest_leads and return its UUID."""
    res = _client().table("happynest_leads").insert(data).execute()
    if not res.data:
        raise RuntimeError("Failed to create lead in Supabase")
    return str(res.data[0]["id"])