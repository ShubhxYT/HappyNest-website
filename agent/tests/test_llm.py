"""Unit tests for the dual-provider LLM client."""

import pytest
from cag_agent.llm import LLMClient
from cag_agent.config import Settings


@pytest.fixture
def mock_settings() -> Settings:
    return Settings(
        google_api_key="google-test-key",
        openrouter_api_key="openrouter-test-key",
        google_model="test-google-model",
        openrouter_model="test-or-model",
    )


def _make_sse_response(content: str) -> bytes:
    """Build SSE-encoded bytes for a streaming response."""
    parts = []
    import json
    for char in content:
        chunk = json.dumps({"choices": [{"delta": {"content": char}}]})
        parts.append(f"data: {chunk}\n\n".encode())
    return b"".join(parts) + b"data: [DONE]\n\n"


def test_ask_primary_success(mock_settings, httpx_mock):
    """Happy path: Google returns an answer immediately."""
    response_content = _make_sse_response("Check-in is at 2:00 PM.")
    httpx_mock.add_response(
        url="https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
        content=response_content,
        headers={"content-type": "text/event-stream"},
    )
    client = LLMClient(settings=mock_settings)
    answer = client.ask("What is check-in time?")
    assert "2:00 PM" in answer


@pytest.mark.httpx_mock(assert_all_requests_were_expected=False)
def test_ask_fallback_on_primary_failure(mock_settings, httpx_mock):
    """Google fails with 503; OpenRouter fallback succeeds."""
    httpx_mock.add_response(
        url="https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
        status_code=503,
    )
    response_content = _make_sse_response("Check-in is at 2:00 PM.")
    httpx_mock.add_response(
        url="https://openrouter.ai/api/v1/chat/completions",
        content=response_content,
        headers={"content-type": "text/event-stream"},
    )
    client = LLMClient(settings=mock_settings)
    answer = client.ask("What is check-in time?")
    assert "2:00 PM" in answer


@pytest.mark.httpx_mock(assert_all_requests_were_expected=False)
def test_ask_both_fail(mock_settings, httpx_mock):
    """Both providers return errors; a RuntimeError is raised."""
    httpx_mock.add_response(
        url="https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
        status_code=503,
    )
    httpx_mock.add_response(
        url="https://openrouter.ai/api/v1/chat/completions",
        status_code=500,
    )
    client = LLMClient(settings=mock_settings)
    with pytest.raises(RuntimeError, match="Both providers failed"):
        client.ask("What is check-in time?")