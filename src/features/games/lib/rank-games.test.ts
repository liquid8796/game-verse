import { describe, expect, it } from "vitest";
import type { Game } from "../domain/game";
import { rankGames } from "./rank-games";

const makeGame = (title: string, heat: number, score: number): Game => ({
  id: title,
  slug: title.toLowerCase().replaceAll(" ", "-"),
  title,
  deck: "",
  genre: "Action",
  developer: "Studio",
  publisher: "Publisher",
  releaseDate: null,
  status: "live",
  platforms: ["PC"],
  score,
  heat,
  accent: "#fff",
  heroVariant: "ember",
});

describe("rankGames", () => {
  it("orders by heat first and score second", () => {
    const result = rankGames([
      makeGame("B", 80, 95),
      makeGame("A", 90, 70),
      makeGame("C", 80, 99),
    ]);
    expect(result.map((game) => game.title)).toEqual(["A", "C", "B"]);
  });

  it("uses title as a deterministic final tie breaker without mutating input", () => {
    const games = [makeGame("Zeta", 80, 90), makeGame("Alpha", 80, 90)];
    const result = rankGames(games);
    expect(result.map((game) => game.title)).toEqual(["Alpha", "Zeta"]);
    expect(games.map((game) => game.title)).toEqual(["Zeta", "Alpha"]);
  });
});
