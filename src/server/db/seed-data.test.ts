import { describe, expect, it } from "vitest";
import { seedArticles, seedGames } from "./seed-data";

describe("published catalog integrity", () => {
  it("has unique stable game and story identifiers and URLs", () => {
    for (const collection of [seedGames, seedArticles]) {
      expect(new Set(collection.map((item) => item.id)).size).toBe(collection.length);
      expect(new Set(collection.map((item) => item.slug)).size).toBe(collection.length);
    }
  });

  it("gives every game a substantive overview and at least one linked story", () => {
    for (const game of seedGames) {
      expect(game.overview?.includes("## Sources"), game.slug).toBe(true);
      expect(seedArticles.some((article) => article.gameId === game.id), game.slug).toBe(true);
      expect(game.platforms.length, game.slug).toBeGreaterThan(0);
    }
    const gameIds = new Set(seedGames.map((game) => game.id));
    for (const article of seedArticles) {
      if (article.gameId) expect(gameIds.has(article.gameId), article.slug).toBe(true);
    }
  });

  it("includes reader-facing source links for every published story", () => {
    for (const article of seedArticles) {
      expect(article.body.includes("## Sources"), article.slug).toBe(true);
      expect(article.body.split("## Sources")[1], article.slug).toMatch(/\[[^\]]+\]\(https:\/\//);
    }
  });
});
