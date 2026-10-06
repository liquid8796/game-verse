import type { Game } from "../domain/game";

export function rankGames(games: Game[]): Game[] {
  return [...games].sort(
    (left, right) =>
      right.heat - left.heat ||
      right.score - left.score ||
      left.title.localeCompare(right.title),
  );
}
