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
});
