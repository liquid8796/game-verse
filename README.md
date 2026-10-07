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

The production hostname is:

`https://gameverse.online`

`https://www.gameverse.online` and the original `sslip.io` hostname redirect to the
canonical apex domain.

Deploy only from a clean `master` that exactly matches `origin/master`:

```powershell
.\scripts\deploy-oci.ps1
```

The script archives the committed revision, uploads it over SSH, creates the isolated database/user on first deploy, and builds in staging while the current site stays live. After validating Caddy, it stops the app briefly, migrates and seeds PostgreSQL, promotes the release, restarts systemd, and verifies the health endpoint. Publishing content after the build keeps the old article renderer from displaying the new editorial format during compilation.

## Editorial content

Article bodies and game overviews live in `src/server/db/editorial`. The database seed upserts stable article/game IDs, so revising a story preserves saved-story and library references. Article reading times are calculated from the body; publication dates remain intact and revision dates are updated when seeded.

Bodies support paragraphs, `##` section headings, `-` bullet lists and Markdown links to sources. The shared `EditorialBody` component renders these as semantic text elements without accepting authored HTML. Each game hub has a distinct overview; the directory uses a shorter deck.

Display ads are intentionally disabled until an ad network ID/configuration is supplied. The layout already reserves ad integration through the `AdSlot` abstraction.
