import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Game } from "../domain/game";
import { getGameArtwork } from "../lib/game-artwork";

export function GameCard({ game, index }: { game: Game; index?: number }) {
  const artwork = getGameArtwork(game.slug);
  return (
    <Link href={"/games/" + game.slug} className="game-card" aria-label={game.title}
      style={{ "--card-accent": game.accent } as CSSProperties}>
      <div className="game-card-art" aria-hidden="true">
        {artwork && (
          <Image
            className="game-card-image"
            src={artwork.src}
            alt=""
            fill
            sizes="(max-width: 620px) calc(100vw - 28px), (max-width: 920px) 50vw, 33vw"
          />
        )}
        <span>{index === undefined ? "GV" : String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className="game-card-body">
        <div className="game-card-meta"><span>{game.genre}</span><span>{game.status}</span></div>
        <h3>{game.title}</h3><p>{game.deck}</p>
        <div className="game-card-platforms">{game.platforms.slice(0, 3).map((platform) => <span key={platform}>{platform}</span>)}</div>
      </div>
    </Link>
  );
}
