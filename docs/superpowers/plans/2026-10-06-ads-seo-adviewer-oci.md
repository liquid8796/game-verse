# Ads, SEO, Ad-Viewer and OCI Deployment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate Adcash AutoTag monetization, optimize comprehensive SEO & Schema.org structured data, port and configure run-ad-viewer runner for GameVerse, and deploy to OCI VM production.

**Architecture:**
- Adcash AutoTag (`msrwbncmi0`) added cleanly to `<head>` and client mount containers, activated via `NEXT_PUBLIC_ADS_ENABLED`.
- SEO enhanced with rich metadata, OpenGraph, Twitter Cards, robots rules, sitemap timestamps, and Schema.org JSON-LD (WebSite, Article, VideoGame, BreadcrumbList).
- Ad-Viewer runner (`run-ad-viewer.bat`, `adViewer.mjs`, `adViewerFingerprint.mjs`, `winMouse.ps1`, `deploy/extensions/canvas-blocker`) ported and adapted from `jarvis-hh3d-web` to fit GameVerse domain, keywords, and zone ID.
- VM OCI deployment script updated to activate ads in production, verified with end-to-end curl health and tag presence.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Vitest, Playwright-Core, Caddy, Systemd, OCI Ubuntu Linux.

## Global Constraints
- Do not break existing Next.js conventions or dynamic route behavior.
- Ensure all existing vitest tests and TypeScript checks pass without errors.
- Working tree must be committed and pushed before running `deploy-oci.ps1`.

---

### Task 1: Adcash AutoTag Integration & Verification
- Create `src/lib/adcash/config.ts` with `ADCASH_AUTOTAG_ZONE_ID = "msrwbncmi0"`, `ADCASH_LIB_SRC = "//acscdn.com/script/aclib.js"`, and `adcashEnabled()`.
- Create `src/components/AdcashAds.tsx` with `AdcashHead` and `AdcashAds`.
- Create `src/components/adcash/AdcashClientAds.tsx` with container `#adcash-ad-container`.
- Create `src/app/adcash.css` with container styles and import in `src/app/globals.css`.
- Update `src/app/layout.tsx` to include `<AdcashHead />` in `<head>` and `<AdcashAds />` in `<body>`.
- Create `src/lib/adcash/adcash.test.ts` to test configuration, gating logic, and script generation.

### Task 2: Comprehensive SEO Optimization
- Enhance `src/app/layout.tsx` metadata with complete OpenGraph, Twitter Cards, keywords, robots directives, and canonical alternates.
- Enhance `src/app/games/page.tsx`, `src/app/articles/page.tsx`, `src/app/discover/page.tsx` with OpenGraph & Twitter metadata.
- Enhance `src/app/games/[slug]/page.tsx` with dynamic OpenGraph, Twitter, and Schema.org `VideoGame` and `BreadcrumbList` JSON-LD.
- Enhance `src/app/articles/[slug]/page.tsx` with Schema.org `Article` and `BreadcrumbList` JSON-LD.
- Update `src/app/robots.ts` and `src/app/sitemap.ts` with host references and accurate timestamps.
- Create unit tests for SEO and structured data validation.

### Task 3: Port and Adapt Ad-Viewer Runner
- Copy and adapt `run-ad-viewer.bat` to root of `game-verse`.
- Copy and adapt `scripts/adViewer.mjs` to `game-verse/scripts/` with GameVerse branding, `gameverse.online` default URL, search queries, and zone ID `msrwbncmi0`.
- Copy `scripts/adViewerFingerprint.mjs` and `scripts/winMouse.ps1` to `scripts/`.
- Copy `deploy/extensions/canvas-blocker` to `deploy/extensions/canvas-blocker`.
- Add `playwright-core` to `package.json` devDependencies.
- Add test or verification script `scripts/verify-adviewer.test.ts` to ensure all files and configurations are aligned.

### Task 4: Deploy to VM OCI and Verification
- Update `scripts/deploy-oci.ps1` and `.env.example` to ensure `NEXT_PUBLIC_ADS_ENABLED=true` on OCI.
- Verify `scripts/deploy-oci.test.ts` passes.
- Run tests (`npm test`), typecheck (`npm run typecheck`), and build (`npm run build`).
- Commit and push to `origin/master`.
- Run `.\scripts\deploy-oci.ps1` to deploy to VM OCI.
- Verify live site response on `https://gameverse.online` and confirm Adcash tag presence and SEO headers.
