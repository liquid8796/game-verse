import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/features/articles/components/article-card";
import { formatDate } from "@/lib/format";
import { getSiteUrl } from "@/lib/site-url";
import { getArticlesForGame, getGameBySlug } from "@/server/queries/content";

export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const game = await getGameBySlug(slug);
  if (!game) return { title: "Game not found" };

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
    },
    twitter: {
      card: "summary_large_image",
      title: `${game.title} | GameVerse`,
      description: game.deck,
    },
  };
}

export default async function GamePage({ params }: Props) {
  const { slug } = await params;
  const game = await getGameBySlug(slug);
  if (!game) notFound();
  const articles = await getArticlesForGame(game.id);
  const siteUrl = getSiteUrl();

  const gameJsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: game.title,
    description: game.deck,
    genre: game.genre,
    gamePlatform: game.platforms,
    author: { "@type": "Organization", name: game.developer },
    publisher: { "@type": "Organization", name: game.publisher },
    datePublished: game.releaseDate ?? undefined,
    ...(game.score
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: game.score,
            bestRating: 100,
            worstRating: 0,
            ratingCount: 1,
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
        <div className="shell game-detail-grid">
          <div>
            <p className="page-kicker">{game.genre} · {game.status}</p>
            <h1>{game.title}</h1><p className="lead">{game.deck}</p>
          </div>
          <div>
            <div className="score-blocks">
              <div className="score-block"><span>GV score</span><strong>{game.score}</strong></div>
              <div className="score-block"><span>Heat</span><strong>{game.heat}</strong></div>
            </div>
            <dl className="data-stack">
              <div><dt>Release</dt><dd>{formatDate(game.releaseDate)}</dd></div>
              <div><dt>Developer</dt><dd>{game.developer}</dd></div>
              <div><dt>Publisher</dt><dd>{game.publisher}</dd></div>
              <div><dt>Platforms</dt><dd>{game.platforms.join(" · ")}</dd></div>
            </dl>
          </div>
        </div>
      </header>
      <section className="content-section"><div className="shell">
        <div className="section-heading">
          <span className="section-index">01</span>
          <div><h2>Coverage</h2><p>{articles.length} connected stor{articles.length === 1 ? "y" : "ies"}.</p></div>
        </div>
        {articles.length ? (
          <div className="article-grid">{articles.map((article, index) =>
            <ArticleCard key={article.id} article={article} prominent={index === 0} />)}</div>
        ) : (
          <div className="empty-state"><strong>Coverage is loading in.</strong><span>Check back as the signal gets stronger.</span></div>
        )}
        <div style={{ marginTop: 34 }}><Link className="text-link" href="/games">← Back to game index</Link></div>
      </div></section>
    </main>
  );
}
