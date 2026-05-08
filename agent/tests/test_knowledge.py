"""Unit tests for the knowledge base loader."""

from cag_agent.knowledge import load_knowledge


def test_load_knowledge_returns_non_empty_string():
    ctx = load_knowledge()
    assert len(ctx) > 0


def test_load_knowledge_includes_expected_sources():
    ctx = load_knowledge()
    assert "SOURCE: QnA.md" in ctx
    assert "SOURCE: property-details.md" in ctx


def test_load_knowledge_contains_property_name():
    ctx = load_knowledge()
    assert "HappyNest" in ctx