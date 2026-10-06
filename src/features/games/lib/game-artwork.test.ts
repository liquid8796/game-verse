import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { seedGames } from "@/server/db/seed-data";
import { getGameArtwork } from "./game-artwork";

describe("game artwork", () => {
  it("provides a local image and source for every seeded game", () => {
    for (const game of seedGames) {
      const artwork = getGameArtwork(game.slug);
      expect(artwork, game.slug).toBeDefined();
      expect(artwork?.sourceUrl).toMatch(/^https:\/\//);
      expect(
        existsSync(join(process.cwd(), "public", artwork!.src.replace(/^\//, ""))),
        artwork?.src,
      ).toBe(true);
    }
  });

  it("uses the cache-busted official GTA VI hero asset", () => {
    expect(getGameArtwork("gta-vi")?.src).toBe("/game-media/gta-vi-official-poster-v2.webp");
  });
});
