const apiTargets: Record<string, string> = {
  "/api/chat/stream": "http://backend/chat/stream",
  "/api/leads": "http://backend/leads",
};

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);
    const target = apiTargets[url.pathname];

    if (request.method === "POST" && target) {
      try {
        return env.AGENT.fetch(new Request(target, request));
      } catch (error) {
        console.error("[vpc-gateway] upstream fetch failed", error);
        return Response.json(
          { ok: false, error: "Agent backend unreachable" },
          { status: 502 },
        );
      }
    }

    if (url.pathname.startsWith("/api/")) {
      return new Response("Not found", { status: 404 });
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
