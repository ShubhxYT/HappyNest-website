# CAG Agent

Cache-Augmented Generation (CAG) chatbot for HappyNest Blanc Belle FAQ.

## Setup

```bash
cd agent
uv sync
# Edit ../.env and add your NVIDIA_API_KEY and OPENROUTER_API_KEY
```

## Usage

### Interactive Chat

```bash
uv run python -m cag_agent.cli chat
```

Type your question and press Enter. The assistant streams the answer. Type `exit` or `quit` to stop.

### Battery Test

Runs 10 predefined FAQ questions and prints pass/fail:

```bash
uv run python -m cag_agent.cli test
```

## Testing

### Unit Tests (mocked, no API keys needed)

```bash
uv run pytest
```

### Integration Tests (requires real API keys)

```bash
RUN_INTEGRATION_TESTS=1 uv run pytest
```

## Project Structure

```
agent/
├── src/cag_agent/
│   ├── __init__.py
│   ├── config.py          # Pydantic settings (loads from root .env.local)
│   ├── knowledge.py       # Markdown knowledge loader
│   ├── llm.py             # Dual-provider LLM client
│   └── cli.py             # Typer CLI
├── tests/
│   ├── test_knowledge.py
│   ├── test_llm.py
│   └── test_integration.py
├── pyproject.toml
├── .python-version
└── README.md
```

## Environment Variables

| Variable | Description |
|---|---|
| `NVIDIA_API_KEY` | NVIDIA NIM API key (primary provider) |
| `OPENROUTER_API_KEY` | OpenRouter API key (fallback to Gemini) |

## Deployment Notes

- All environment variables live in the root `.env` file.
- The agent reads from `../.env` relative to its source directory.
- A FastAPI wrapper can be added later in `src/cag_agent/main.py`.
- Dockerize separately or deploy as a serverless function.