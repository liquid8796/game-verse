import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EditorialBody } from "@/components/editorial-body";
import { ArticleCard } from "@/features/articles/components/article-card";
import { getCurrentUser } from "@/features/auth/lib/session";
import { getGameArtwork } from "@/features/games/lib/game-artwork";
import { LibraryControl } from "@/features/library/components/library-control";
import { getLibraryStatus } from "@/features/library/repository/library-repository";
import { RatingControl } from "@/features/reviews/components/rating-control";
import { ReviewForm } from "@/features/reviews/components/review-form";
import {
  getMemberRating,
  getMemberReview,
  getRatingSummary,
  listGameReviews,
} from "@/features/reviews/repository/review-repository";
import { WatchlistControl } from "@/features/watchlist/components/watchlist-control";
import { isGameWatched } from "@/features/watchlist/repository/watchlist-repository";
import { formatDate } from "@/lib/format";
import { getSiteUrl } from "@/lib/site-url";
import { getArticlesForGame, getGameBySlug } from "@/server/queries/content";

export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const game = await getGameBySlug(slug);
  if (!game) return { title: "Game not found" };
  const artwork = getGameArtwork(game.slug);

  const canonical = "/games/" + game.slug;
  return {
    title: `${game.title} — News, Scores & Guides`,
    description: game.deck,
    keywords: [
      game.title,
      game.genre,
      game.developer,
      game.publisher,
      ...game.platforms,
      "game guide",
      "game review",
      "GameVerse",
    ],
    alternates: { canonical },
    openGraph: {
      type: "website",
      title: `${game.title} | GameVerse`,
      description: game.deck,
      url: canonical,
      images: artwork ? [{ url: artwork.src, alt: artwork.alt }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${game.title} | GameVerse`,
      description: game.deck,
      images: artwork ? [artwork.src] : undefined,
    },
  };
}

export default async function GamePage({ params }: Props) {
  const { slug } = await params;
  const game = await getGameBySlug(slug);
  if (!game) notFound();
  const member = await getCurrentUser();
  const [articles, ratingSummary, reviews] = await Promise.all([
    getArticlesForGame(game.id),
    getRatingSummary(game.id),
    listGameReviews(game.id),
  ]);
  const [libraryStatus, watched, currentRating, currentReview] = member
    ? await Promise.all([
        getLibraryStatus(member.id, game.id),
        isGameWatched(member.id, game.id),
        getMemberRating(member.id, game.id),
        getMemberReview(member.id, game.id),
      ])
    : [undefined, false, undefined, undefined];
  const siteUrl = getSiteUrl();
  const artwork = getGameArtwork(game.slug);

  const gameJsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: game.title,
    description: game.deck,
    genre: game.genre,
    gamePlatform: game.platforms,
    author: { "@type": "Organization", name: game.developer },
    publisher: { "@type": "Organization", name: game.publisher },
    image: artwork ? siteUrl + artwork.src : undefined,
    datePublished: game.releaseDate ?? undefined,
    ...(ratingSummary.count
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: Number(ratingSummary.average.toFixed(1)),
            bestRating: 10,
            worstRating: 1,
            ratingCount: ratingSummary.count,
          },
        }
      : {}),
    url: siteUrl + "/games/" + game.slug,
  };

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Games", item: siteUrl + "/games" },
      { "@type": "ListItem", position: 3, name: game.title, item: siteUrl + "/games/" + game.slug },
    ],
  };

  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gameJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <header className="game-detail-hero" style={{ "--game-accent": game.accent } as CSSProperties}>
        {artwork && (
          <Image
            className="game-detail-image"
            src={artwork.src}
            alt=""
            fill
            priority
            sizes="100vw"
          />
        )}
        <div className="shell game-detail-grid">
          <div>
            <p className="page-kicker">{game.genre} · {game.status}</p>
            <h1>{game.title}</h1><p className="lead">{game.deck}</p>
          </div>
          <div>
            <div className="score-blocks">
              <div className="score-block"><span>Player rating / 10</span><strong>{ratingSummary.count ? ratingSummary.average.toFixed(1) : "—"}</strong></div>
              <div className="score-block"><span>GV interest</span><strong>{game.heat}</strong></div>
            </div>
            <p className="game-interest-note">GV interest reflects our editorial ordering. Player ratings appear below.</p>
            <dl className="data-stack">
              <div><dt>Release</dt><dd>{formatDate(game.releaseDate)}</dd></div>
              <div><dt>Developer</dt><dd>{game.developer}</dd></div>
              <div><dt>Publisher</dt><dd>{game.publisher}</dd></div>
              <div><dt>Platforms</dt><dd>{game.platforms.join(" · ")}</dd></div>
            </dl>
            {member && (
              <div className="member-game-actions">
                <LibraryControl
                  gameId={game.id}
                  slug={game.slug}
                  status={libraryStatus}
                />
                <WatchlistControl
                  gameId={game.id}
                  slug={game.slug}
                  watched={watched}
                />
              </div>
            )}
          </div>
        </div>
        {artwork && <span className="game-detail-media-credit">Media · {artwork.credit}</span>}
      </header>
      {game.overview && (
        <section className="content-section game-overview"><div className="shell">
          <div className="section-heading">
            <span className="section-index">01</span>
            <div><h2>About {game.title}</h2><p>{game.status === "upcoming" ? "The announced setting, platforms and things to know before release." : "How it plays, who it suits and where to start."}</p></div>
          </div>
          <EditorialBody body={game.overview} headingLevel={3} />
        </div></section>
      )}
      <section className="content-section"><div className="shell">
        <div className="section-heading">
          <span className="section-index">02</span>
          <div><h2>Stories and guides</h2><p>{articles.length} stor{articles.length === 1 ? "y" : "ies"} about {game.title}.</p></div>
        </div>
        {articles.length ? (
          <div className="article-grid">{articles.map((article, index) =>
            <ArticleCard key={article.id} article={article} prominent={index === 0} />)}</div>
        ) : (
          <div className="empty-state"><strong>No stories published yet.</strong><span>Browse the game overview above, or explore our other guides.</span></div>
        )}
      </div></section>
      <section className="content-section community-reviews-section"><div className="shell">
        <div className="section-heading">
          <span className="section-index">03</span>
          <div>
            <h2>Player reviews</h2>
            <p>Read what other players think, or sign in to share your own rating and review.</p>
          </div>
        </div>

        <div className="community-rating-summary">
          <div>
            <span>Community score</span>
            <strong>{ratingSummary.count ? ratingSummary.average.toFixed(1) : "—"}</strong>
            <small>/ 10</small>
          </div>
          <div>
            <span>Ratings</span>
            <strong>{ratingSummary.count}</strong>
          </div>
          <div>
            <span>Reviews</span>
            <strong>{reviews.length}</strong>
          </div>
        </div>

        {member ? (
          <div className="community-member-panel">
            <div>
              <div className="member-panel-index">YOUR RATING</div>
              <RatingControl
                gameId={game.id}
                slug={game.slug}
                currentRating={currentRating}
              />
            </div>
            <div>
              <div className="member-panel-index">YOUR REVIEW</div>
              <ReviewForm
                gameId={game.id}
                slug={game.slug}
                review={currentReview}
              />
            </div>
          </div>
        ) : (
          <div className="community-signin-callout">
            <div>
              <span>Share your experience</span>
              <strong>What did you enjoy? What fell short?</strong>
              <p>Sign in to add a rating or review. Other readers can see it on this page.</p>
            </div>
            <Link className="button-primary" href={"/login?next=" + encodeURIComponent("/games/" + game.slug)}>
              Sign in to review
            </Link>
          </div>
        )}

        {reviews.length ? (
          <div className="community-review-list">
            {reviews.map((review) => (
              <article className="community-review" key={review.userId}>
                <header>
                  <div className="review-avatar" aria-hidden="true">
                    {review.displayName.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <strong>{review.displayName}</strong>
                    <span>@{review.username}</span>
                  </div>
                  {review.rating && <b>{review.rating}/10</b>}
                </header>
                <h3>{review.headline}</h3>
                <p>{review.body}</p>
                <time dateTime={review.updatedAt.toISOString()}>
                  Updated {new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(review.updatedAt)}
                </time>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state community-empty">
            <strong>No player reviews yet.</strong>
            <span>Played it? Sign in and tell other readers what to expect.</span>
          </div>
        )}

        <div style={{ marginTop: 34 }}><Link className="text-link" href="/games">← Back to game index</Link></div>
      </div></section>
    </main>
  );
}
