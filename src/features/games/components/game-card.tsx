import type { CSSProperties } from "react";
import Link from "next/link";
import type { Game } from "../domain/game";

export function GameCard({ game, index }: { game: Game; index?: number }) {
  return (
    <Link href={"/games/" + game.slug} className="game-card" aria-label={game.title}
      style={{ "--card-accent": game.accent } as CSSProperties}>
      <div className="game-card-art" aria-hidden="true"><span>{index === undefined ? "GV" : String(index + 1).padStart(2, "0")}</span></div>
      <div className="game-card-body">
        <div className="game-card-meta"><span>{game.genre}</span><span>Heat {game.heat}</span></div>
        <h3>{game.title}</h3><p>{game.deck}</p>
        <div className="game-card-platforms">{game.platforms.slice(0, 3).map((platform) => <span key={platform}>{platform}</span>)}</div>
      </div>
    </Link>
  );
}
