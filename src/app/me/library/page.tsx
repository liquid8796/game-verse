import type { Metadata } from "next";
import Link from "next/link";
import { MemberNav } from "@/features/auth/components/member-nav";
import { requireCurrentUser } from "@/features/auth/lib/session";
import { GameCard } from "@/features/games/components/game-card";
import { LibraryControl } from "@/features/library/components/library-control";
import {
  formatLibraryStatus,
  libraryStatuses,
} from "@/features/library/domain/library";
import { listLibrary } from "@/features/library/repository/library-repository";

export const metadata: Metadata = {
  title: "My Game Library",
  robots: { index: false, follow: false },
};

export default async function LibraryPage() {
  const member = await requireCurrentUser("/me/library");
  const entries = await listLibrary(member.id);
  const counts = Object.fromEntries(
    libraryStatuses.map((status) => [
      status,
      entries.filter((entry) => entry.status === status).length,
    ]),
  ) as Record<(typeof libraryStatuses)[number], number>;

  return (
    <main id="main" className="member-page member-library-page">
      <section className="shell member-page-head member-library-head">
        <div>
          <p className="page-kicker">Personal collection</p>
          <h1 className="page-title">My game <span>library.</span></h1>
          <p className="member-page-deck">
            Track what you’re playing, what you’ve finished and what you’d like to try.
            Change a game’s status as you go; your library doesn’t need to be a to-do list.
          </p>
        </div>
        <div className="member-library-total">
          <span>Total games</span>
          <strong>{entries.length}</strong>
        </div>
      </section>

      <div className="shell"><MemberNav active="library" /></div>

      <section className="shell member-library-stats" aria-label="Library status summary">
        {libraryStatuses.map((status) => (
          <div key={status}>
            <span>{formatLibraryStatus(status)}</span>
            <strong>{counts[status]}</strong>
          </div>
        ))}
      </section>

      <section className="shell member-library-content">
        {entries.length ? (
          <div className="member-library-grid">
            {entries.map((entry, index) => (
              <article className="member-library-item" key={entry.game.id}>
                <div className="member-library-state">{formatLibraryStatus(entry.status)}</div>
                <GameCard game={entry.game} index={index} />
                <LibraryControl
                  gameId={entry.game.id}
                  slug={entry.game.slug}
                  status={entry.status}
                  compact
                />
              </article>
            ))}
          </div>
        ) : (
          <div className="member-library-empty">
            <span>00 / EMPTY</span>
            <h2>No games in your library yet.</h2>
            <p>Open a game page and choose Playing, Backlog, Wishlist or another status. You can change it whenever your plans do.</p>
            <Link className="button-primary" href="/games">Browse games</Link>
          </div>
        )}
      </section>
    </main>
  );
}
