import { describe, expect, it } from "vitest";
import { articleRowToDomain, gameRowToDomain } from "./mappers";

describe("database mappers", () => {
  it("maps a database game row without leaking persistence fields", () => {
    const game = gameRowToDomain({
      id: "gta-vi",
      slug: "gta-vi",
      title: "Grand Theft Auto VI",
      deck: "Rockstar returns to Vice City.",
      genre: "Open world",
      developer: "Rockstar Games",
      publisher: "Rockstar Games",
      releaseDate: "2026-11-19",
      status: "upcoming",
      platforms: ["PS5", "Xbox Series X|S"],
      score: 96,
      heat: 100,
      accent: "#ff5a36",
      heroVariant: "sunset",
      createdAt: new Date("2026-10-06T00:00:00Z"),
      updatedAt: new Date("2026-10-06T00:00:00Z"),
    });

    expect(game).toEqual({
      id: "gta-vi",
      slug: "gta-vi",
      title: "Grand Theft Auto VI",
      deck: "Rockstar returns to Vice City.",
      genre: "Open world",
      developer: "Rockstar Games",
      publisher: "Rockstar Games",
      releaseDate: "2026-11-19",
      status: "upcoming",
      platforms: ["PS5", "Xbox Series X|S"],
      score: 96,
      heat: 100,
      accent: "#ff5a36",
      heroVariant: "sunset",
    });
  });

  it("maps article dates to ISO strings", () => {
    const article = articleRowToDomain({
      id: "a1",
      slug: "guide",
      title: "Guide",
      excerpt: "Excerpt",
      body: "Body",
      type: "guide",
      gameId: null,
      author: "GameVerse",
      publishedAt: new Date("2026-10-06T01:02:03Z"),
      readMinutes: 4,
      featured: false,
      createdAt: new Date("2026-10-06T00:00:00Z"),
      updatedAt: new Date("2026-10-06T00:00:00Z"),
    });

    expect(article.publishedAt).toBe("2026-10-06T01:02:03.000Z");
  });
});
