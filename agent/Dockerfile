FROM python:3.12-slim AS builder

WORKDIR /app

RUN pip install --no-cache-dir uv

COPY agent/pyproject.toml agent/uv.lock ./
RUN uv sync --frozen --no-dev --no-install-project

COPY agent/src ./src
RUN uv sync --frozen --no-dev

FROM python:3.12-slim AS runner

WORKDIR /app

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

COPY --from=builder /app/.venv /app/.venv
COPY --from=builder /app/src /app/src
COPY docs /app/docs

ENV PATH="/app/.venv/bin:$PATH"
ENV DOCS_DIR=/app/docs

EXPOSE 8000

CMD ["uvicorn", "cag_agent.api:app", "--host", "0.0.0.0", "--port", "8000"]
