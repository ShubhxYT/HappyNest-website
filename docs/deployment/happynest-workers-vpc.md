# HappyNest Workers VPC Deployment

## Private-backend contract

`backend` is a Docker DNS name private to `docker-compose.backend.yaml`. It listens only on port 8000 inside the `agent-vpc` Compose network. It has no host port, Coolify FQDN, Caddy/Traefik labels, external `coolify` network, or connection to the existing HappyNest deployment network.

The `cloudflared` sidecar is a Workers VPC connector, not a public Tunnel route. The Tunnel has no public hostname, public application route, or CIDR route. The only intended private destination is the VPC Service registered as `backend:8000`.

## Runtime-only secrets

Set these values as Coolify runtime-only secrets on the new application:

- `GOOGLE_API_KEY`
- `OPENROUTER_API_KEY`
- `SUPABASE_URL`
- `SUPABASE_KEY`
- `TUNNEL_TOKEN`

Set `CAG_API_HOST=0.0.0.0` and `CAG_API_PORT=8000`. Keep `CAG_API_CORS_ORIGINS` limited to local development or explicitly approved direct-browser origins; the deployed UI calls its same-origin Worker, not the agent.

## Provisioned resources

- Coolify project: `Happynest-Backend-VPC`
- Coolify environment: `production`
- Coolify private application UUID: `morv93kcfpllfc69j8int1ky`
- Server: `localhost`
- Compose file: `docker-compose.backend.yaml` (deployed as `docker-compose.yaml` on this branch)
- Public FQDN: none
- Cloudflare Tunnel name: `Happynest-VPC-Tunnel`
- Cloudflare Tunnel ID: `a84ce5ad-6490-46b9-ad37-bcadf89dfff5`
- VPC Service name: `happynest-agent-vpc`
- VPC Service ID: `019fcc3e-058d-7620-8ba2-e2f241115e05`
- VPC Service target: `backend:8000` over HTTP
- Tunnel public hostname: none

## Worker deployment

The static UI is built with `npm run build:static` and deployed with `npm run cf:deploy`.

- Worker name: `happynest-site`
- Public URL: `https://happynest-site.shubhsomani098.workers.dev`
- Static asset directory: `out/`
- VPC Service ID source: `wrangler.jsonc` `vpc_services[0].service_id`
- Public Worker API paths: `POST /api/chat/stream` and `POST /api/leads`
- Non-public agent paths: `/health` and `/chat/history/{session_id}`

The Worker passes FastAPI responses through directly so SSE response bodies and headers are not buffered or reconstructed. An unreachable VPC connector returns a Worker-generated `502`; reachable upstream non-2xx responses retain their FastAPI status.

## Rollback

Disable the new Worker deployment or redeploy the prior Worker version. Do not change, redeploy, or roll back the existing Coolify application. The private agent remains non-public throughout rollback.
