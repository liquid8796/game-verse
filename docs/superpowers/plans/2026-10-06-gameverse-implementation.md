# GameVerse Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a premium mainstream-gaming publication with searchable game/article content, ad-safe layout primitives, PostgreSQL persistence, and production-grade QA.

**Architecture:** A Next.js App Router modular monolith renders server-first pages. Feature query services consume repository interfaces; the PostgreSQL implementation uses Drizzle, while launch fixtures exist only for seeds/tests. Deployment mirrors the OCI VM's current Node + systemd + Caddy pattern.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, Drizzle ORM, PostgreSQL, Vitest, Testing Library, Playwright/browser QA, systemd, Caddy.

**Spec:** `docs/superpowers/specs/2026-10-06-gameverse-design.md`

## Global Constraints

- Work in `D:\Project\FrontEnd\game-verse`.
- Push patches to `master` with Conventional Commit messages.
- No Docker.
- Production VM is Ubuntu 24.04 with Node 24, Caddy, systemd, PostgreSQL 17.
- App production root is `/opt/gameverse`; preferred loopback port is `3003`.
- Preserve the cinematic-game skin and reduced-motion/mobile contracts from the spec.

## Review Focus

- Database unavailable: health route must report failure without exposing credentials; public error handling must remain readable.
- Empty search query and no-results query: discover UI must remain useful and keyboard reachable.
- Very long game/article title: cards and detail headers must wrap without horizontal overflow.
- Reduced motion: continuous ticker/parallax must stop while content remains complete.
- Intermediate mobile/tablet widths: navigation, hero CTA, grids, and ad reservations must not overlap.

---

### Task 1: Foundation, domain contracts, and tests

**Files:**
- Create: `package.json`, Next/TS/Tailwind/Vitest configuration.
- Create: `src/features/games/domain/game.ts`
- Create: `src/features/articles/domain/article.ts`
- Create: `src/features/games/lib/rank-games.ts`
- Create: `src/features/discovery/lib/search-content.ts`
- Test: `src/features/games/lib/rank-games.test.ts`
- Test: `src/features/discovery/lib/search-content.test.ts`

**Interfaces:**
- Produces: `rankGames(games: Game[]): Game[]`, `searchContent(query, games, articles): SearchResult[]`, domain types shared by later tasks.

- [ ] Write ranking/search tests first, including empty query and deterministic ties.
- [ ] Run tests and verify RED because implementations do not exist.
- [ ] Scaffold the Next.js project and implement only enough domain logic to pass.
- [ ] Run unit tests, typecheck, lint.
- [ ] Commit and push `feat(core): establish gameverse foundation`.

### Task 2: PostgreSQL schema, repositories, seed, and health

**Files:**
- Create: `drizzle.config.ts`
- Create: `src/server/db/schema.ts`, `client.ts`, `seed.ts`
- Create: repository contracts/implementations under each feature.
- Create: `src/app/api/health/route.ts`
- Test: repository mapper/query tests and health response utility tests.

**Interfaces:**
- Consumes: Task 1 domain types.
- Produces: `GameRepository`, `ArticleRepository`, query services used by pages.

- [ ] Write failing mapper/query and health-state tests.
- [ ] Verify RED.
- [ ] Implement schema, repositories, seed data, health response.
- [ ] Run tests/typecheck/lint.
- [ ] Commit and push `feat(data): add postgres content repositories`.

### Task 3: Cinematic design system and public routes

**Files:**
- Create/modify: `src/app/layout.tsx`, `globals.css`, home, games, game detail, articles, article detail, discover, not-found/error routes.
- Create: shared UI under `src/components/`.
- Create: feature components under `src/features/*/components/`.
- Test: critical component behavior and long-title rendering where practical.

**Interfaces:**
- Consumes: Task 2 query services.
- Produces: complete user-facing route map.

- [ ] Write component/interaction tests for navigation/search/filter behavior before implementation.
- [ ] Verify RED.
- [ ] Build brand tokens, header/footer, hero, ticker, game directory, article surfaces, search UI, ad slots, SEO metadata and JSON-LD.
- [ ] Verify component tests, typecheck, lint, production build.
- [ ] Commit and push `feat(ui): build cinematic gameverse experience`.

### Task 4: Production assets and deployment automation

**Files:**
- Create: `deploy/gameverse.service`, `deploy/Caddyfile.gameverse`, `scripts/deploy-oci.ps1`, `.env.example`, README deployment notes.
- Modify: Next config for standalone production.

**Interfaces:**
- Consumes: Task 3 build output and Task 2 migrations/seed.
- Produces: repeatable non-Docker deployment to OCI.

- [ ] Add script-level validation/tests where feasible for required variables and release paths.
- [ ] Verify local build.
- [ ] Inspect production port/Caddy state again before mutation.
- [ ] Create dedicated PostgreSQL DB/user, protected env file, release directory, service, and Caddy route without disturbing existing services.
- [ ] Run migrations/seed/build/restart and verify health.
- [ ] Commit and push `ops(oci): add non-docker deployment workflow`.

### Task 5: QA-3 browser verification and release fixes

**Files:**
- Modify only files implicated by verified findings.
- Add regression tests for every functional defect fixed.

**Interfaces:**
- Consumes: deployed production and all earlier tests.
- Produces: verified release evidence.

- [ ] Exercise homepage -> games -> game detail -> discover -> article journeys through real input.
- [ ] Check desktop, tablet, mobile, keyboard focus, reduced motion, no-results, long-title behavior.
- [ ] Inspect console/network errors and production health.
- [ ] Re-run full tests, lint, typecheck, build after any fix.
- [ ] Perform a final whole-branch review against spec/plan.
- [ ] Commit/push any QA fixes as `fix(qa): harden production experience`.
