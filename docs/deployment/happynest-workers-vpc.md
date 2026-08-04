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
