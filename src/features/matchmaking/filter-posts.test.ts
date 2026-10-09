import { describe, expect, it } from "vitest";
import { DEFAULT_SQUAD_FILTERS, filterSquads, type SquadFilters } from "./filter-posts";

const posts = [
  {
    id: "a", gameId: "valorant", game: "VALORANT", title: "Ranked squad", description: "PC team",
    owner: "Alpha", mode: "Ranked", region: "Asia", vibe: "Competitive",
    skill: "Advanced", platform: "PC", mic: true, slotsLeft: 1,
    createdAt: new Date("2026-10-08T10:00:00Z"),
  },
  {
    id: "b", gameId: "fortnite", game: "Fortnite", title: "Weekend builders", description: "Build or no build",
    owner: "Bravo", mode: "Zero Build", region: "Europe", vibe: "Chill",
    skill: "Casual", platform: "Cross-play", mic: false, slotsLeft: 3,
    createdAt: new Date("2026-10-09T10:00:00Z"),
  },
  {
    id: "c", gameId: "valorant", game: "VALORANT", title: "Calm duo", description: "Casual queue",
    owner: "Charlie", mode: "Unrated", region: "Asia", vibe: "Chill",
    skill: "Casual", platform: "PC", mic: false, slotsLeft: 2,
    createdAt: new Date("2026-10-07T10:00:00Z"),
  },
];
const withFilters = (override: Partial<SquadFilters>) => ({ ...DEFAULT_SQUAD_FILTERS, ...override });

describe("squad discovery", () => {
  it("shows real listings newest first without changing source data", () => {
    expect(filterSquads(posts, DEFAULT_SQUAD_FILTERS).map((post) => post.id)).toEqual(["b", "a", "c"]);
    expect(posts.map((post) => post.id)).toEqual(["a", "b", "c"]);
  });

  it("respects game, region, playstyle, skill and case-insensitive search", () => {
    expect(filterSquads(posts, withFilters({
      game: "valorant", region: "Asia", vibe: "Chill", skill: "Casual", search: "CALM",
    })).map((post) => post.id)).toEqual(["c"]);
    expect(filterSquads(posts, withFilters({ search: "brAVo" })).map((post) => post.id)).toEqual(["b"]);
  });

  it("includes cross-play for device filters but excludes other platforms", () => {
    expect(filterSquads(posts, withFilters({ platform: "PlayStation" })).map((post) => post.id)).toEqual(["b"]);
    expect(filterSquads(posts, withFilters({ platform: "Cross-play" })).map((post) => post.id)).toEqual(["b"]);
  });

  it("filters microphone preference and number of available spots", () => {
    expect(filterSquads(posts, withFilters({ voice: "preferred" })).map((post) => post.id)).toEqual(["a"]);
    expect(filterSquads(posts, withFilters({ voice: "optional", minSpots: 3 })).map((post) => post.id)).toEqual(["b"]);
  });

  it("offers oldest and most-open-spots sort choices", () => {
    expect(filterSquads(posts, withFilters({ sort: "oldest" })).map((post) => post.id)).toEqual(["c", "a", "b"]);
    expect(filterSquads(posts, withFilters({ sort: "openings" })).map((post) => post.id)).toEqual(["b", "c", "a"]);
  });
});
