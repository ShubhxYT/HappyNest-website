"""Integration tests that hit real API endpoints.

Set RUN_INTEGRATION_TESTS=1 to enable:
    RUN_INTEGRATION_TESTS=1 uv run pytest tests/test_integration.py -v
"""

import os
import pytest
from cag_agent.llm import LLMClient


@pytest.mark.skipif(
    os.getenv("RUN_INTEGRATION_TESTS") != "1",
    reason="Set RUN_INTEGRATION_TESTS=1 to run live API tests",
)
def test_real_nvidia_nim():
    """Ask a simple FAQ question via the real NVIDIA NIM endpoint."""
    client = LLMClient()
    answer = client.ask("What are the check-in timings?")
    assert "2" in answer


@pytest.mark.skipif(
    os.getenv("RUN_INTEGRATION_TESTS") != "1",
    reason="Set RUN_INTEGRATION_TESTS=1 to run live API tests",
)
def test_real_openrouter_fallback():
    """Force fallback by using an invalid NVIDIA key and valid OpenRouter key."""
    from cag_agent.config import Settings

    settings = Settings(
        nvidia_api_key="invalid-key-on-purpose",
        openrouter_api_key=os.getenv("OPENROUTER_API_KEY", ""),
    )
    client = LLMClient(settings=settings)
    answer = client.ask("How much does the BBQ cost?")
    assert "1,000" in answer or "1000" in answer