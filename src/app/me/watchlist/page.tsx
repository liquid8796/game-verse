import type { Metadata } from "next";
import Link from "next/link";
import { MemberNav } from "@/features/auth/components/member-nav";
import { requireCurrentUser } from "@/features/auth/lib/session";
import { GameCard } from "@/features/games/components/game-card";
import { WatchlistControl } from "@/features/watchlist/components/watchlist-control";
import { listWatchlist } from "@/features/watchlist/repository/watchlist-repository";

export const metadata: Metadata = {
  title: "Game Watchlist",
  robots: { index: false, follow: false },
};

export default async function WatchlistPage() {
  const member = await requireCurrentUser("/me/watchlist");
  const entries = await listWatchlist(member.id);

  return (
    <main id="main" className="member-page member-watchlist-page">
      <section className="shell member-page-head">
        <div>
          <p className="page-kicker">Games you follow</p>
          <h1 className="page-title">My <span>watchlist.</span></h1>
          <p className="member-page-deck">
            Keep games you’re interested in together. Your watchlist helps shape your
            personal reading feed and puts upcoming games in your release calendar.
          </p>
        </div>
        <div className="member-library-total">
          <span>Watching</span>
          <strong>{entries.length}</strong>
        </div>
      </section>
      <div className="shell"><MemberNav active="watchlist" /></div>
      <section className="shell member-library-content">
        {entries.length ? (
          <div className="member-library-grid">
            {entries.map((entry, index) => (
              <article className="member-library-item" key={entry.game.id}>
                <div className="member-library-state">Watching</div>
                <GameCard game={entry.game} index={index} />
                <WatchlistControl
                  gameId={entry.game.id}
                  slug={entry.game.slug}
                  watched
                  compact
                />
              </article>
            ))}
          </div>
        ) : (
          <div className="member-library-empty">
            <span>00 / QUIET</span>
            <h2>No games followed yet.</h2>
            <p>Choose Watch game on a game page to add it here. You can follow a game before deciding to put it in your library.</p>
            <Link className="button-primary" href="/games">Find games</Link>
          </div>
        )}
      </section>
    </main>
  );
}
