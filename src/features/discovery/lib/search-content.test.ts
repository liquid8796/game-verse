import { describe, expect, it } from "vitest";
import type { Article } from "@/features/articles/domain/article";
import type { Game } from "@/features/games/domain/game";
import { searchContent } from "./search-content";

const game: Game = {
  id: "g1", slug: "valorant", title: "Valorant", deck: "Tactical 5v5",
  genre: "Shooter", developer: "Riot Games", publisher: "Riot Games",
  releaseDate: null, status: "live", platforms: ["PC"], score: 90, heat: 91,
  accent: "#ff5a36", heroVariant: "ember",
};

const article: Article = {
  id: "a1", slug: "valorant-crosshair-guide", title: "The clean crosshair guide",
  excerpt: "Build a readable crosshair for ranked play.", body: "Guide body",
  type: "guide", gameId: "g1", author: "GameVerse", publishedAt: "2026-10-06",
  readMinutes: 5, featured: true,
};

describe("searchContent", () => {
  it("returns an empty list for blank queries", () => {
    expect(searchContent("   ", [game], [article])).toEqual([]);
  });

  it("matches game title, genre and article copy case-insensitively", () => {
    expect(searchContent("VALORANT", [game], [article])).toHaveLength(2);
    expect(searchContent("shooter", [game], [article])[0]?.kind).toBe("game");
    expect(searchContent("crosshair", [game], [article])[0]?.kind).toBe("article");
  });
});
