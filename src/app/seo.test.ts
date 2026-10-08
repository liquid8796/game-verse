import { describe, expect, it, vi } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

vi.mock("@/server/queries/content", () => ({
  getAllGames: vi.fn().mockResolvedValue([
    {
      id: "valorant",
      slug: "valorant",
      title: "VALORANT",
      releaseDate: "2020-06-02",
      updatedAt: "2026-10-07T06:00:00.000Z",
    },
  ]),
  getAllArticles: vi.fn().mockResolvedValue([
    {
      id: "art-1",
      slug: "valorant-crosshair",
      title: "Build a clean crosshair",
      publishedAt: "2026-10-06T00:00:00.000Z",
    },
  ]),
}));

import robots from "./robots";
import sitemap from "./sitemap";
import manifest from "./manifest";
import { GET as getFeed } from "./feed.xml/route";
import { metadata as layoutMetadata } from "./layout";
import { getSiteUrl } from "@/lib/site-url";

describe("SEO and Metadata configuration", () => {
  it("defaults site URL safely to production https://gameverse.online", () => {
    const current = getSiteUrl();
    expect(current).toMatch(/^https:\/\//);
    expect(current).not.toContain("localhost");
  });

  it("defines comprehensive openGraph, twitter cards and alternate feed in layout metadata", () => {
    expect(layoutMetadata.title).toBeDefined();
    expect(layoutMetadata.description).toBeDefined();
    expect(layoutMetadata.keywords).toBeDefined();
    expect(layoutMetadata.alternates?.types?.["application/rss+xml"]).toContain("/feed.xml");
    expect(layoutMetadata.openGraph).toMatchObject({
      siteName: "GameVerse",
      type: "website",
    });
    expect(layoutMetadata.twitter).toMatchObject({
      card: "summary_large_image",
    });
  });

  it("produces valid robots.txt with host, sitemap url, and disallows private/api paths", () => {
    const robotsConfig = robots();
    expect(robotsConfig.rules).toBeDefined();
    expect(robotsConfig.sitemap).toContain("/sitemap.xml");
    expect(robotsConfig.host).toBeDefined();
    const rules = robotsConfig.rules;
    if (Array.isArray(rules)) {
      expect(rules.some((r) => r.disallow?.includes("/api/"))).toBe(true);
    } else {
      expect(rules?.disallow).toContain("/api/");
      expect(rules?.disallow).toContain("/me/");
    }
  });

  it("provides valid web app manifest for search and mobile presence", () => {
    const manifestConfig = manifest();
    expect(manifestConfig.name).toBe("GameVerse — Game Guides, Features & Releases");
    expect(manifestConfig.short_name).toBe("GameVerse");
    expect(manifestConfig.theme_color).toBe("#0b0e14");
    expect(manifestConfig.icons?.length).toBeGreaterThan(0);
  });

  it("generates an RSS 2.0 feed with stories for search discovery", async () => {
    const res = await getFeed();
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("application/xml");
    const xml = await res.text();
    expect(xml).toContain("<rss version=\"2.0\"");
    expect(xml).toContain("<title>Build a clean crosshair</title>");
    expect(xml).toContain("/articles/valorant-crosshair</link>");
  });

  it("generates sitemap with core index routes and lastModified timestamps", async () => {
    const map = await sitemap();
    expect(map.length).toBeGreaterThanOrEqual(4);
    const urls = map.map((entry) => entry.url);
    expect(urls.some((u) => u.endsWith("/games"))).toBe(true);
    expect(urls.some((u) => u.endsWith("/articles"))).toBe(true);
    expect(urls.some((u) => u.endsWith("/discover"))).toBe(true);

    for (const item of map) {
      expect(item.lastModified).toBeInstanceOf(Date);
    }
    expect(map.find((entry) => entry.url.endsWith("/games/valorant"))?.lastModified).toEqual(new Date("2026-10-07T06:00:00.000Z"));
    expect(map.find((entry) => entry.url.endsWith("/games/valorant"))?.images?.[0]).toContain("/game-media/valorant.webp");
  });

  it("provides Google AdSense verification in ads.txt and schemas in layout", () => {
    const adsTxtPath = join(process.cwd(), "public/ads.txt");
    expect(existsSync(adsTxtPath)).toBe(true);
    const content = readFileSync(adsTxtPath, "utf8");
    expect(content).toContain("google.com, pub-7851683096379872, DIRECT, f08c47fec0942fa0");

    const layoutPath = join(process.cwd(), "src/app/layout.tsx");
    const layoutContent = readFileSync(layoutPath, "utf8");
    expect(layoutContent).toContain("ca-pub-7851683096379872");
    expect(layoutContent).toContain("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js");
    expect(layoutContent).toContain("G-PQES332NL4");
    expect(layoutContent).toContain("https://www.googletagmanager.com/gtag/js?id=G-PQES332NL4");
    expect(layoutContent).toContain("Organization");
    expect(layoutContent).toContain("SearchAction");
  });
});
