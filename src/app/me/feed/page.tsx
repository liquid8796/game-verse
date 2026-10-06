import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/features/articles/components/article-card";
import { MemberNav } from "@/features/auth/components/member-nav";
import { requireCurrentUser } from "@/features/auth/lib/session";
import {
  buildPersonalizedFeed,
  type FeedSignal,
  type FeedSignalSource,
} from "@/features/feed/domain/personalized-feed";
import { listLibrary } from "@/features/library/repository/library-repository";
import { listSavedArticles } from "@/features/saved/repository/saved-repository";
import { listWatchlist } from "@/features/watchlist/repository/watchlist-repository";
import { getAllArticles, getAllGames } from "@/server/queries/content";

export const metadata: Metadata = {
  title: "For You",
  robots: { index: false, follow: false },
};

const sourceLabels: Record<FeedSignalSource, string> = {
  watchlist: "Watchlist",
  library: "Library",
  saved: "Saved signal",
};

export default async function PersonalizedFeedPage() {
  const member = await requireCurrentUser("/me/feed");
  const [library, watchlist, saved, articles, games] = await Promise.all([
    listLibrary(member.id),
    listWatchlist(member.id),
    listSavedArticles(member.id),
    getAllArticles(),
    getAllGames(),
  ]);

  const signals: FeedSignal[] = [
    ...watchlist.map((entry) => ({ gameId: entry.game.id, source: "watchlist" as const, weight: 5 })),
    ...library
      .filter((entry) => entry.status !== "dropped")
      .map((entry) => ({
        gameId: entry.game.id,
        source: "library" as const,
        weight: entry.status === "playing" ? 4 : 3,
      })),
    ...saved.flatMap((entry) =>
      entry.article.gameId
        ? [{ gameId: entry.article.gameId, source: "saved" as const, weight: 2 }]
        : [],
    ),
  ];

  const savedIds = new Set(saved.map((entry) => entry.article.id));
  const feed = buildPersonalizedFeed(articles, signals, savedIds);
  const gameTitles = new Map(games.map((game) => [game.id, game.title]));
  const signalGameCount = new Set(signals.map((signal) => signal.gameId)).size;

  return (
    <main id="main" className="member-page member-feed-page">
      <section className="shell member-page-head">
        <div>
          <p className="page-kicker">Personal signal</p>
          <h1 className="page-title">For <span>you.</span></h1>
          <p className="member-page-deck">
            Coverage ranked from the games you watch, play and save — not a generic engagement feed.
          </p>
        </div>
        <div className="member-library-total">
          <span>Signal games</span>
          <strong>{signalGameCount}</strong>
        </div>
      </section>

      <div className="shell"><MemberNav active="feed" /></div>

      <section className="shell member-feed-wrap">
        {signals.length && feed.length ? (
          <>
            <div className="member-feed-summary">
              <span>{feed.length} matched stories</span>
              <p>Watchlist carries the strongest weight, followed by active library games and related saved coverage.</p>
            </div>
            <div className="member-feed-grid">
              {feed.map((item, index) => {
                const gameTitle = item.article.gameId ? gameTitles.get(item.article.gameId) : undefined;
                return (
                  <article className="member-feed-item" key={item.article.id}>
                    <div className="member-feed-reason">
                      <span>{gameTitle ?? "Your signal"}</span>
                      <div>
                        {item.sources.map((source) => <b key={source}>{sourceLabels[source]}</b>)}
                      </div>
                    </div>
                    <ArticleCard article={item.article} prominent={index === 0 && feed.length > 2} />
                  </article>
                );
              })}
            </div>
          </>
        ) : (
          <div className="member-library-empty">
            <span>00 / SIGNALS</span>
            <h2>Teach GameVerse what matters.</h2>
            <p>Add games to your Watchlist or Library, or save a story. Your private feed will assemble itself from those signals.</p>
            <div className="member-feed-empty-actions">
              <Link className="button-primary" href="/games">Choose games</Link>
              <Link className="button-ghost" href="/articles">Browse stories</Link>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
