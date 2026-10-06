import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/features/articles/components/article-card";
import { formatDate } from "@/lib/format";
import { getArticlesForGame, getGameBySlug } from "@/server/queries/content";

export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const game = await getGameBySlug(slug);
  if (!game) return { title: "Game not found" };
  return { title: game.title, description: game.deck, alternates: { canonical: "/games/" + game.slug } };
}

export default async function GamePage({ params }: Props) {
  const { slug } = await params;
  const game = await getGameBySlug(slug);
  if (!game) notFound();
  const articles = await getArticlesForGame(game.id);

  return (
    <main id="main">
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
