import type { Game } from "@/features/games/domain/game";
import type { LibraryEntry } from "@/features/library/domain/library";

export interface CalendarWatchEntry {
  game: Game;
}

export interface ReleaseCalendarEntry {
  game: Game;
  source: "library" | "watchlist" | "both";
}

export interface ReleaseCalendarMonth {
  key: string;
  label: string;
  entries: ReleaseCalendarEntry[];
}

export function buildReleaseCalendar(
  library: LibraryEntry[],
  watchlist: CalendarWatchEntry[],
): ReleaseCalendarMonth[] {
  const entries = new Map<string, ReleaseCalendarEntry>();

  for (const item of library) {
    if (!item.game.releaseDate) continue;
    entries.set(item.game.id, { game: item.game, source: "library" });
  }

  for (const item of watchlist) {
    if (!item.game.releaseDate) continue;
    const existing = entries.get(item.game.id);
    entries.set(item.game.id, {
      game: item.game,
      source: existing ? "both" : "watchlist",
    });
  }

  const sorted = [...entries.values()].sort((a, b) =>
    (a.game.releaseDate ?? "").localeCompare(b.game.releaseDate ?? ""),
  );
  const months = new Map<string, ReleaseCalendarMonth>();

  for (const entry of sorted) {
    const releaseDate = entry.game.releaseDate!;
    const key = releaseDate.slice(0, 7);
    const label = new Intl.DateTimeFormat("en", {
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(releaseDate + "T00:00:00Z"));
    const month = months.get(key) ?? { key, label, entries: [] };
    month.entries.push(entry);
    months.set(key, month);
  }

  return [...months.values()];
}

export function daysUntilRelease(releaseDate: string, now = new Date()) {
  const target = new Date(releaseDate + "T00:00:00Z").getTime();
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return Math.ceil((target - today) / 86_400_000);
}
