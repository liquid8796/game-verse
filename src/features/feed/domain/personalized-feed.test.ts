import { describe, expect, it } from "vitest";
import type { Article } from "@/features/articles/domain/article";
import { buildPersonalizedFeed } from "./personalized-feed";

function article(id: string, gameId: string, publishedAt = "2026-10-05T00:00:00.000Z"): Article {
  return {
    id,
    slug: id,
    title: id,
    excerpt: id,
    body: id,
    type: "news",
    gameId,
    author: "GameVerse",
    publishedAt,
    readMinutes: 4,
    featured: false,
  };
}

describe("buildPersonalizedFeed", () => {
  it("prioritizes stronger member signals and ignores unrelated games", () => {
    const result = buildPersonalizedFeed(
      [article("watched", "g1"), article("library", "g2"), article("unrelated", "g3")],
      [
        { gameId: "g1", source: "watchlist", weight: 5 },
        { gameId: "g2", source: "library", weight: 3 },
      ],
      new Set(),
      new Date("2026-10-06T00:00:00.000Z"),
    );

    expect(result.map((item) => item.article.id)).toEqual(["watched", "library"]);
  });

  it("combines signals and slightly deprioritizes already saved stories", () => {
    const result = buildPersonalizedFeed(
      [
        article("already-saved", "g1", "2026-10-06T00:00:00.000Z"),
        article("fresh", "g1", "2026-10-05T23:00:00.000Z"),
      ],
      [
        { gameId: "g1", source: "watchlist", weight: 5 },
        { gameId: "g1", source: "library", weight: 3 },
      ],
      new Set(["already-saved"]),
      new Date("2026-10-06T01:00:00.000Z"),
    );

    expect(result[0].article.id).toBe("fresh");
    expect(result[0].sources).toEqual(expect.arrayContaining(["watchlist", "library"]));
  });
});
