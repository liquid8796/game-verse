import type { Game } from "@/features/games/domain/game";

export function TrendTicker({ games }: { games: Game[] }) {
  const items = games.slice(0, 6);
  return (
    <div className="ticker" aria-label="Trending games">
      <div className="ticker-track">
        {[...items, ...items].map((game, index) => (
          <span key={game.id + "-" + index}>
            <b>{String((index % items.length) + 1).padStart(2, "0")}</b>{game.title}<i>{game.heat}</i>
          </span>
        ))}
      </div>
    </div>
  );
}
