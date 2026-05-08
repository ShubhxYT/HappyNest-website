.PHONY: help install agent-install agent-server agent-server-reload agent-chat agent-test web-dev web-build dev

help:
	@echo "Targets:"
	@echo "  install              Install both Python and Node deps"
	@echo "  agent-install        uv sync inside agent/"
	@echo "  agent-server         Run FastAPI on $$CAG_API_PORT (default 8000)"
	@echo "  agent-server-reload  FastAPI with --reload"
	@echo "  agent-chat           Run the Rich CLI chat"
	@echo "  agent-test           Run the canned FAQ test battery"
	@echo "  web-dev              Next.js dev server"
	@echo "  web-build            Next.js production build"
	@echo "  dev                  Run both agent (reload) and web in parallel"

install: agent-install
	npm install

agent-install:
	cd agent && uv sync

agent-server:
	cd agent && uv run cag-agent server

agent-server-reload:
	cd agent && uv run cag-agent server --reload

agent-chat:
	cd agent && uv run cag-agent chat

agent-test:
	cd agent && uv run cag-agent test

web-dev:
	npm run dev -- -H 0.0.0.0

web-build:
	npm run build

dev:
	@echo "Starting agent (reload) on :8000 and Next.js dev server on 0.0.0.0:3000 in parallel..."
	@trap 'kill 0' SIGINT SIGTERM EXIT; \
		(cd agent && uv run cag-agent server --reload) & \
		npm run dev -- -H 0.0.0.0 & \
		wait