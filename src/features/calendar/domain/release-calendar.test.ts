import { describe, expect, it } from "vitest";
import type { Game } from "@/features/games/domain/game";
import { buildReleaseCalendar, daysUntilRelease } from "./release-calendar";

const game = (id: string, releaseDate: string | null): Game => ({
  id,
  slug: id,
  title: id.toUpperCase(),
  deck: "deck",
  genre: "Action",
  developer: "Dev",
  publisher: "Pub",
  releaseDate,
  status: "upcoming",
  platforms: ["PC"],
  score: 80,
  heat: 80,
  accent: "#fff",
  heroVariant: "test",
});

describe("personal release calendar", () => {
  it("deduplicates library and watchlist games and groups releases by month", () => {
    const shared = game("shared", "2026-11-19");
    const december = game("december", "2026-12-04");
    const months = buildReleaseCalendar(
      [{
        game: shared,
        status: "wishlist",
        addedAt: new Date(),
        updatedAt: new Date(),
      }],
      [{ game: shared }, { game: december }, { game: game("live", null) }],
    );

    expect(months).toHaveLength(2);
    expect(months[0].entries[0].source).toBe("both");
    expect(months[1].entries[0].game.id).toBe("december");
  });

  it("calculates whole UTC days until release", () => {
    expect(daysUntilRelease("2026-11-19", new Date("2026-11-17T23:30:00Z"))).toBe(2);
  });
});
