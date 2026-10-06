import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import type { Article } from "@/features/articles/domain/article";
import type { Game } from "@/features/games/domain/game";
import { DiscoverySearch } from "./discovery-search";

const games: Game[] = [{
  id: "valorant", slug: "valorant", title: "VALORANT", deck: "Tactical 5v5",
  genre: "Tactical shooter", developer: "Riot", publisher: "Riot", releaseDate: null,
  status: "live", platforms: ["PC"], score: 90, heat: 92, accent: "#ff5a36",
  heroVariant: "signal",
}];

const articles: Article[] = [{
  id: "guide", slug: "valorant-crosshair", title: "Build a clean crosshair",
  excerpt: "Clarity for ranked play.", body: "Crosshair guide", type: "guide",
  gameId: "valorant", author: "GameVerse", publishedAt: "2026-10-06T00:00:00.000Z",
  readMinutes: 4, featured: true,
}];

describe("DiscoverySearch", () => {
  it("searches across games and linked coverage as the user types", async () => {
    const user = userEvent.setup();
    render(<DiscoverySearch games={games} articles={articles} />);
    await user.type(screen.getByRole("searchbox", { name: /search gameverse/i }), "valorant");
    expect(screen.getByRole("link", { name: /valorant/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /build a clean crosshair/i })).toBeInTheDocument();
  });

  it("keeps a useful prompt for blank input", () => {
    render(<DiscoverySearch games={games} articles={articles} />);
    expect(screen.getByText(/search games, genres, studios and guides/i)).toBeInTheDocument();
  });
});
