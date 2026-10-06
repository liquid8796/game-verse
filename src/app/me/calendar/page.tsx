import type { Metadata } from "next";
import Link from "next/link";
import { MemberNav } from "@/features/auth/components/member-nav";
import { requireCurrentUser } from "@/features/auth/lib/session";
import {
  buildReleaseCalendar,
  daysUntilRelease,
} from "@/features/calendar/domain/release-calendar";
import { getGameArtwork } from "@/features/games/lib/game-artwork";
import { listLibrary } from "@/features/library/repository/library-repository";
import { listWatchlist } from "@/features/watchlist/repository/watchlist-repository";

export const metadata: Metadata = {
  title: "Personal Release Calendar",
  robots: { index: false, follow: false },
};

export default async function CalendarPage() {
  const member = await requireCurrentUser("/me/calendar");
  const [library, watchlist] = await Promise.all([
    listLibrary(member.id),
    listWatchlist(member.id),
  ]);
  const months = buildReleaseCalendar(library, watchlist);
  const total = months.reduce((sum, month) => sum + month.entries.length, 0);

  return (
    <main id="main" className="member-page member-calendar-page">
      <section className="shell member-page-head">
        <div>
          <p className="page-kicker">Launch radar</p>
          <h1 className="page-title">Release <span>calendar.</span></h1>
          <p className="member-page-deck">
            A private launch timeline generated from the games in your library and watchlist.
          </p>
        </div>
        <div className="member-library-total">
          <span>Tracked releases</span>
          <strong>{total}</strong>
        </div>
      </section>
      <div className="shell"><MemberNav active="calendar" /></div>
      <section className="shell release-calendar-wrap">
        {months.length ? months.map((month) => (
          <section className="release-calendar-month" key={month.key}>
            <header>
              <span>{month.key}</span>
              <h2>{month.label}</h2>
              <strong>{month.entries.length}</strong>
            </header>
            <div>
              {month.entries.map(({ game, source }) => {
                const artwork = getGameArtwork(game.slug);
                const days = daysUntilRelease(game.releaseDate!);
                return (
                  <Link className="release-calendar-entry" href={"/games/" + game.slug} key={game.id}>
                    <time dateTime={game.releaseDate!}>
                      <b>{game.releaseDate!.slice(8, 10)}</b>
                      <span>{new Intl.DateTimeFormat("en", { weekday: "short", timeZone: "UTC" }).format(new Date(game.releaseDate! + "T00:00:00Z"))}</span>
                    </time>
                    <div
                      className="release-calendar-art"
                      style={artwork ? { backgroundImage: `linear-gradient(90deg,rgba(7,7,10,.12),#07070a),url("${artwork.src}")` } : undefined}
                      aria-hidden="true"
                    />
                    <div className="release-calendar-copy">
                      <span>{source === "both" ? "Library + Watchlist" : source}</span>
                      <h3>{game.title}</h3>
                      <p>{game.platforms.join(" · ")}</p>
                    </div>
                    <div className="release-calendar-countdown">
                      <strong>{days < 0 ? "LIVE" : days === 0 ? "TODAY" : days}</strong>
                      {days > 0 && <span>days</span>}
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )) : (
          <div className="member-library-empty">
            <span>00 / DATES</span>
            <h2>No tracked releases yet.</h2>
            <p>Add upcoming games to your Library or Watchlist and their release dates will appear automatically.</p>
            <Link className="button-primary" href="/games">Browse games</Link>
          </div>
        )}
      </section>
    </main>
  );
}
