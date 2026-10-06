# GameVerse

GameVerse is a server-rendered mainstream gaming publication built around fast discovery, useful editorial coverage, game hubs, and ad-safe layouts.

## Stack

- Next.js App Router + TypeScript
- React Server Components by default
- PostgreSQL 17 + Drizzle ORM
- Vitest + Testing Library
- Caddy + systemd on Oracle Cloud
- No Docker

## Local development

Copy the environment template and point it at a PostgreSQL database:

```powershell
Copy-Item .env.example .env.local
npm ci
npm run db:migrate
npm run db:seed
npm run dev
```

Quality gates:

```powershell
npm test
npm run typecheck
npm run lint
npm run build
```

## Architecture

The app is a modular monolith. Server-rendered routes call feature query services, which consume repository interfaces. PostgreSQL/Drizzle implementations live under `src/server/db`; UI code does not import the database client directly.

Primary routes:

- `/` — editorial homepage
- `/games` and `/games/[slug]` — directory and game hubs
- `/articles` and `/articles/[slug]` — stories and guides
- `/discover` — cross-content search
- `/api/health` — application/database readiness
- `/robots.txt` and `/sitemap.xml` — crawler surfaces

## OCI deployment

Production mirrors the VM's existing pattern:

- Ubuntu 24.04
- Node 24
- PostgreSQL 17 on loopback
- Caddy on ports 80/443
- GameVerse on `127.0.0.1:3003`
- systemd unit `gameverse.service`
- app root `/opt/gameverse/current`
- secrets in `/opt/gameverse/shared/.env`

The temporary production hostname is:

`https://gameverse.158.180.59.36.sslip.io`

Deploy only from a clean `master` that exactly matches `origin/master`:

```powershell
.\scripts\deploy-oci.ps1
```

The script archives the committed revision, uploads it over SSH, creates the isolated database/user on first deploy, migrates and seeds PostgreSQL, builds on the VM, validates Caddy, restarts systemd, and verifies the health endpoint.

Display ads are intentionally disabled until an ad network ID/configuration is supplied. The layout already reserves ad integration through the `AdSlot` abstraction.
