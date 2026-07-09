# HappyNest — Blanc Belle Website

![HappyNest Preview](./preview.gif)

## The Story

My dad owns a beautiful luxury farm stay property in Sohna, Haryana — **HappyNest — Blanc Belle**. It's this stunning white gem nestled in farmland, perfect for weekend getaways with family, friends, and even pets. The property has everything: a gorgeous pool, a jacuzzi, sprawling lawns, game areas, and rooms designed for pure comfort.

I decided to build a website for it. Not because I'm a frontend developer (I'm not, lol), but because I wanted to showcase what makes this place special. So I coded it full-stack — Next.js on the frontend, and everything wired up to make it work smoothly.

---

## Documentation

- **[Design System](./docs/DESIGN.md)** - Complete design specifications
- **[Property Details](./docs/property-details.md)** - Villa specifications and details
- **[Development Guide](./docs/README.md)** - Development documentation

---

## Deployment

This website is **self-hosted** on our own server. It's live at **[happynestfarm.in](https://happynestfarm.in)** — our own domain, our own infrastructure.

I set it up this way because:
- Full control over the server and infrastructure
- No reliance on third-party platforms
- Direct management of the website

### Running Locally

If you want to run this project locally for development:

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

To build the project for deployment:

```bash
npm run build
npm start
```

---

## Built With

- **Next.js** — The React framework for production
- **TypeScript** — For type safety
- **Tailwind CSS** — For styling (because why not make it look good?)
- **Self-hosted infrastructure** — Full control, zero platform lock-in

---

## Running the AI chat agent

The chat widget on the website is powered by a FastAPI service that wraps
the existing `LLMClient` (Google Gemini primary, OpenRouter fallback) and
persists every turn to a self-hosted Supabase Postgres.

### One-time setup

```bash
make install                            # uv sync + npm install
cp agent/.env.example agent/.env        # fill in keys + SUPABASE_*
cp -n .env.example .env.local           # set AGENT_API_URL=http://localhost:8000
```

Apply the SQL in `agent/supabase/migrations/001_create_chat_tables.sql`
to your self-hosted Supabase project (Studio → SQL Editor → Run).

### Run everything in dev

```bash
make dev          # runs FastAPI (--reload) on :8000 and Next.js on :3000
```

### Run them individually

```bash
make agent-server-reload                                    # via Typer command
# OR raw uvicorn:
cd agent && uv run uvicorn cag_agent.api:app --reload --port 8000

make web-dev
```

### Health check

```bash
curl http://localhost:8000/health
```

---

## License

MIT — Use it, fork it, build on it. That's the spirit of sharing.
