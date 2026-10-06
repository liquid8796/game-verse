import { describe, expect, it, vi } from "vitest";

vi.mock("@/server/queries/content", () => ({
  getAllGames: vi.fn().mockResolvedValue([
    {
      id: "valorant",
      slug: "valorant",
      title: "VALORANT",
      releaseDate: null,
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
import { metadata as layoutMetadata } from "./layout";

describe("SEO and Metadata configuration", () => {
  it("defines comprehensive openGraph and twitter cards in layout metadata", () => {
    expect(layoutMetadata.title).toBeDefined();
    expect(layoutMetadata.description).toBeDefined();
    expect(layoutMetadata.keywords).toBeDefined();
    expect(layoutMetadata.openGraph).toMatchObject({
      siteName: "GameVerse",
      type: "website",
    });
    expect(layoutMetadata.twitter).toMatchObject({
      card: "summary_large_image",
    });
  });

  it("produces valid robots.txt with host and sitemap url", () => {
    const robotsConfig = robots();
    expect(robotsConfig.rules).toBeDefined();
    expect(robotsConfig.sitemap).toContain("/sitemap.xml");
    expect(robotsConfig.host).toBeDefined();
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
  });

  it("provides Google AdSense verification in ads.txt", () => {
    const { readFileSync, existsSync } = require("node:fs");
    const { join } = require("node:path");
    const adsTxtPath = join(process.cwd(), "public/ads.txt");
    expect(existsSync(adsTxtPath)).toBe(true);
    const content = readFileSync(adsTxtPath, "utf8");
    expect(content).toContain("google.com, pub-7851683096379872, DIRECT, f08c47fec0942fa0");

    const layoutPath = join(process.cwd(), "src/app/layout.tsx");
    const layoutContent = readFileSync(layoutPath, "utf8");
    expect(layoutContent).toContain("ca-pub-7851683096379872");
    expect(layoutContent).toContain("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js");
  });
});
