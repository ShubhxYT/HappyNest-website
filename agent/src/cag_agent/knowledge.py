"""Load and concatenate all Markdown knowledge base files."""

from pathlib import Path

DOCS_DIR = Path(__file__).parent.parent.parent.parent / "docs"


def load_knowledge() -> str:
    """Load every *.md file in docs/ and return a single context string."""
    if not DOCS_DIR.exists():
        raise FileNotFoundError(f"Knowledge directory not found: {DOCS_DIR}")

    md_files = sorted(DOCS_DIR.glob("*.md"))
    if not md_files:
        raise FileNotFoundError(f"No .md files found in {DOCS_DIR}")

    parts: list[str] = []
    for filepath in md_files:
        content = filepath.read_text(encoding="utf-8")
        parts.append(f"--- SOURCE: {filepath.name} ---\n{content}")

    return "\n\n".join(parts)