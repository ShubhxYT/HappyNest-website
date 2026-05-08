import type { ChatRequest } from "@/types/chat";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const AGENT_API_URL = process.env.AGENT_API_URL ?? "http://localhost:8000";

export async function POST(request: Request) {
  let body: ChatRequest;
  try {
    body = (await request.json()) as ChatRequest;
  } catch {
    return Response.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  if (!body || typeof body.question !== "string" || !body.question.trim()) {
    return Response.json(
      { ok: false, error: "Missing 'question'" },
      { status: 400 },
    );
  }

  let upstream: Response;
  try {
    upstream = await fetch(`${AGENT_API_URL}/chat/stream`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
      },
      body: JSON.stringify({
        session_id: body.session_id ?? null,
        question: body.question,
      }),
      cache: "no-store",
    });
  } catch (err) {
    console.error("[chat-proxy] upstream fetch failed:", err);
    return Response.json(
      { ok: false, error: "Agent backend unreachable" },
      { status: 502 },
    );
  }

  if (!upstream.ok || !upstream.body) {
    const text = await upstream.text().catch(() => "");
    console.error("[chat-proxy] upstream error", upstream.status, text);
    return Response.json(
      { ok: false, error: text || `Upstream ${upstream.status}` },
      { status: 502 },
    );
  }

  return new Response(upstream.body, {
    status: 200,
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}