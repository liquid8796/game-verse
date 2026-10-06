import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import type { Game } from "../domain/game";
import { GamesDirectory } from "./games-directory";

const games: Game[] = [
  {
    id: "minecraft", slug: "minecraft", title: "Minecraft", deck: "Blocks forever",
    genre: "Sandbox", developer: "Mojang", publisher: "Xbox", releaseDate: null,
    status: "live", platforms: ["PC"], score: 95, heat: 94, accent: "#d7ff58",
    heroVariant: "blocks",
  },
  {
    id: "valorant", slug: "valorant", title: "VALORANT", deck: "Tactical 5v5",
    genre: "Tactical shooter", developer: "Riot", publisher: "Riot", releaseDate: null,
    status: "live", platforms: ["PC"], score: 90, heat: 92, accent: "#ff5a36",
    heroVariant: "signal",
  },
];

describe("GamesDirectory", () => {
  it("filters games by free-text search without hiding the search control", async () => {
    const user = userEvent.setup();
    render(<GamesDirectory games={games} />);
    await user.type(screen.getByRole("searchbox", { name: /search games/i }), "mine");
    expect(screen.getByRole("link", { name: /minecraft/i })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /valorant/i })).not.toBeInTheDocument();
    expect(screen.getByRole("searchbox", { name: /search games/i })).toBeVisible();
  });

  it("shows an explicit no-results state", async () => {
    const user = userEvent.setup();
    render(<GamesDirectory games={games} />);
    await user.type(screen.getByRole("searchbox", { name: /search games/i }), "zzzz");
    expect(screen.getByText(/no games matched/i)).toBeInTheDocument();
  });
});
