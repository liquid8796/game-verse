# GameVerse — Product & System Design

## Intent

GameVerse is an English-language mainstream gaming publication built to grow organic/search/social traffic and monetize primarily through display advertising. The first release must feel like a premium gaming product rather than a generic news template, while remaining fast, accessible, maintainable, and inexpensive to operate on the existing Oracle Cloud VM.

## Success criteria

- A polished, responsive public site with a distinctive cinematic gaming identity.
- Useful home/discover/game/article experiences populated with realistic launch content.
- Search-friendly metadata, structured content, sitemap/robots, internal linking, and ad-safe layout regions.
- PostgreSQL persistence with a clean domain/repository boundary.
- Production deployment on the existing OCI VM using its current non-Docker pattern.
- QA-3 style verification for the flagship homepage and QA-2 for supporting routes.

## Constraints

- Workspace: `D:\Project\FrontEnd\game-verse`.
- Branch: `master`; patches are committed and pushed with Conventional Commit messages.
- No Docker.
- OCI host: `158.180.59.36`.
- Match existing production conventions: Ubuntu 24.04, Node 24, systemd, Caddy, PostgreSQL 17.
- Initial visual media is authored CSS/SVG artwork rather than a large copyrighted screenshot library.

## Architecture decision

### Recommended: Next.js full-stack modular monolith

- Next.js App Router + TypeScript.
- React Server Components by default; client components only for real interaction.
- PostgreSQL + Drizzle ORM.
- Feature-first modules: games, articles, discovery, ads, shared UI.
- Repository interfaces isolate persistence from rendering.
- A service/query layer owns ranking, filtering, and page composition.
- `AdSlot` components reserve stable ad geometry without hard-coding an ad network.

This is preferred over:

1. **Separate frontend + API service** — physically cleaner, but doubles deployment/observability work without current value.
2. **Headless CMS-first** — excellent editorial tooling, but adds operational surface before there is an editorial team that needs it.

The modular monolith preserves clean seams for later extraction.

## Route map

- `/` — cinematic editorial homepage.
- `/games` — filterable game directory.
- `/games/[slug]` — game hub with summary, signals, platforms, related coverage.
- `/articles` — latest coverage.
- `/articles/[slug]` — editorial article/guide page.
- `/discover` — searchable discovery surface.
- `/api/health` — deployment/database health endpoint.
- `/sitemap.xml`, `/robots.txt` — search engine surfaces.

## Domain model

### Game

- id, slug, title, deck
- genre, developer, publisher
- releaseDate, status, platforms[]
- score, heat, accent
- heroVariant
- createdAt, updatedAt

### Article

- id, slug, title, excerpt, body
- type: news | guide | feature | review
- gameId nullable
- author, publishedAt, readMinutes
- featured, createdAt, updatedAt

The launch schema is intentionally small. Accounts, comments, ratings, newsletters, and live feeds are deferred until traffic justifies them.

## Data flow

Page/RSC -> feature query service -> repository -> Drizzle -> PostgreSQL.

Components never import the database client directly. Database-specific code stays under `src/server/db` and repository implementations.

Tests and seed operations use curated launch data. Production pages use PostgreSQL so deployment/data failures are visible instead of silently serving stale fixtures.

## Visual direction

### Thesis: “The night before launch”

GameVerse should feel like a premium command desk for what players care about next: editorial, high-energy, cinematic, and modern without becoming a faux sci-fi HUD.

### Palette

- Void — `#07070A`
- Carbon — `#111116`
- Fog — `#E7E4DD`
- Signal — `#FF5A36`
- Ion — `#70E1F5`
- Volt — `#D7FF58`

Signal is the primary brand accent; Ion and Volt are semantic accents used sparingly for live/trending/data states.

### Type

- Display: Barlow Condensed — compressed, poster-like, high energy.
- Text/UI: Manrope — contemporary and highly legible.

### Layout grammar

- Strong left alignment and asymmetric editorial grids.
- Hard 1–6 px corner treatment instead of rounded SaaS cards.
- Full-bleed “world” hero with readable editorial overlay.
- A horizontal trend ticker introduces motion without turning the page into an animated dashboard.
- Alternating large story blocks, compact signal rows, and directory slices create rhythm.
- Signature interaction: pointer-aware hero light-field/parallax with a reduced-motion fallback.

### Anti-template rules

- No generic neon cyberpunk HUD.
- No identical card grid covering the full page.
- No random glitch text.
- No decorative all-caps eyebrow above every heading.
- No motion on every element; motion is concentrated in hero/ticker/state changes.

## Homepage chapters

1. **Entry / hero** — GameVerse wordmark, primary story, live signal ribbon, clear browse action.
2. **Now playing** — compact ranked list of mainstream active games.
3. **Field report** — editorial feature pairing large typography with a single abstract visual world.
4. **Release radar** — upcoming/just-released timeline.
5. **Guides worth opening** — utility-oriented coverage cards.
6. **Footer** — low-noise navigation and brand close.

## Motion contract

- Hero pointer movement changes local light position and subtle depth only.
- Ticker moves continuously at a low rate and pauses on hover/focus.
- Route/section reveals use one coordinated initial sequence, not repeated fade-up boilerplate.
- `prefers-reduced-motion` disables continuous travel/parallax while preserving hierarchy.
- Animation pauses when the document is hidden where relevant.

## Responsive contract

- Desktop: asymmetric 12-column editorial composition.
- Tablet: 8-column simplification; hero remains media-dominant.
- Mobile: single-column reading order, ticker remains horizontally clipped, pointer-only effects removed.
- No content or controls depend on hover.

## Accessibility

- WCAG-aware contrast on all text.
- Semantic landmarks/headings.
- Visible keyboard focus and skip link.
- Touch targets >= 44 px for primary controls.
- Reduced-motion path.
- Search/filter controls have programmatic labels.

## SEO & monetization

- Metadata templates and canonical URLs.
- Organization/WebSite/Article structured data where appropriate.
- Server-rendered primary content.
- Stable ad slots after high-value content blocks, never overlapping controls or causing CLS.
- Ads are disabled in development unless explicitly configured.
- No auto-generated thin pages.

## Error handling

- Custom not-found and route error boundaries.
- Repository failures log server-side and surface useful retry-safe experiences.
- `/api/health` reports app readiness and DB connectivity without exposing credentials.

## Testing

- Unit tests for ranking/filter/query utilities and repository mappers.
- Component tests for core interactive controls where practical.
- Build/lint/typecheck gates.
- Browser QA with real navigation and input.
- Desktop, tablet, and mobile viewports.
- Keyboard and reduced-motion checks.
- Console/network inspection after critical journeys.

## Production layout

- App path: `/opt/gameverse`.
- systemd unit: `gameverse.service`.
- Bind app to `127.0.0.1:3003` unless final inventory shows the port is occupied.
- Caddy reverse-proxies the site entry to the loopback service.
- PostgreSQL database/user dedicated to GameVerse with least-privilege credentials in a protected environment file.
- Deploy flow: install -> migrate -> build -> sync release -> service restart -> health verification.

## Deferred scope

- Authentication/accounts.
- Comments/community.
- User ratings.
- Push notifications.
- Newsletter delivery.
- Admin CMS.
- External live stats ingestion.
- Oracle Object Storage uploads.

These are extension points, not launch requirements.
