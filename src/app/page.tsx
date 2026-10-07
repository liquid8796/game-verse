import Image from "next/image";
import Link from "next/link";
import { AdSlot } from "@/components/ad-slot";
import { HeroWorld } from "@/components/hero-world";
import { SectionHeading } from "@/components/section-heading";
import { TrendTicker } from "@/components/trend-ticker";
import { ArticleCard } from "@/features/articles/components/article-card";
import { getGameArtwork } from "@/features/games/lib/game-artwork";
import { formatDate } from "@/lib/format";
import { getSiteUrl } from "@/lib/site-url";
import { getHomeData } from "@/server/queries/content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { games, articles } = await getHomeData();
  const hero = games[0];
  const feature =
    articles.find((article) => article.slug === "why-minecraft-keeps-winning") ??
    articles[0];
  const guides = articles.filter((article) => article.type === "guide").slice(0, 3);
  if (!hero) return null;
  const heroArtwork = getGameArtwork(hero.slug);
  const featureGame = feature?.gameId
    ? games.find((game) => game.id === feature.gameId)
    : undefined;
  const featureArtwork = featureGame ? getGameArtwork(featureGame.slug) : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "GameVerse",
    url: getSiteUrl(),
    description: "Game guides, features and release information for PC and console players.",
  };

  return (
    <main id="main" className="site-main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="hero">
        <HeroWorld accent={hero.accent} imageSrc={heroArtwork?.src} />
        <div className="shell hero-content">
          <div>
            <p className="hero-kicker">Upcoming release · {formatDate(hero.releaseDate)}</p>
            <h1>
              {hero.title.split(" ").slice(0, -1).join(" ")}
              <em>{hero.title.split(" ").at(-1)}</em>
            </h1>
            <p className="hero-deck">{hero.deck}</p>
            <div className="hero-actions">
              <Link className="button-primary" href={"/games/" + hero.slug}>
                Explore {hero.title} <span aria-hidden="true">↗</span>
              </Link>
              <Link className="button-ghost" href="/games">Browse all games</Link>
            </div>
          </div>
          <aside className="hero-stat-panel" aria-label={hero.title + " quick facts"}>
            <div><span>Status</span><strong>{hero.status}</strong></div>
            <div><span>Genre</span><strong>{hero.genre}</strong></div>
            <div><span>Developer</span><strong>{hero.developer}</strong></div>
            <div><span>Platforms</span><strong>{hero.platforms.slice(0, 2).join(" · ")}</strong></div>
          </aside>
        </div>
      </section>

      <TrendTicker games={games} />

      <section className="content-section">
        <div className="shell">
          <SectionHeading
            index="01"
            title="On our radar"
            copy="New releases, competitive favourites and games you can settle into for an evening. Start with a game to find its overview and guides."
            href="/games"
            linkLabel="Full directory"
          />
          <div className="rank-list">
            {games.slice(0, 6).map((game, index) => (
              <Link className="rank-row" key={game.id} href={"/games/" + game.slug}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{game.title}</strong>
                <p>{game.genre} · {game.developer}</p>
                <span className="heat" aria-label={"Heat " + game.heat}>
                  <i style={{ width: game.heat + "%" }} />
                </span>
                <span className="rank-arrow" aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <AdSlot name="home-mid" />

      {feature && (
        <section className="content-section">
          <div className="shell">
            <SectionHeading index="02" title="A closer look" copy="The small details that explain why a game stays with us." />
            <div className="feature-split">
              <div className="feature-art" aria-hidden="true">
                {featureArtwork && (
                  <Image
                    className="feature-art-image"
                    src={featureArtwork.src}
                    alt=""
                    fill
                    sizes="(max-width: 920px) 100vw, 60vw"
                  />
                )}
              </div>
              <div className="feature-copy">
                <span>{feature.type} · {feature.readMinutes} min</span>
                <h3>{feature.title}</h3>
                <p>{feature.excerpt}</p>
                <Link className="text-link" href={"/articles/" + feature.slug}>
                  Read the feature <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="content-section">
        <div className="shell">
          <SectionHeading
            index="03"
            title="What to play next"
            copy="See what's on the way, or return to a game that's already available. Each hub includes platform details and a place to start."
          />
          <div className="release-grid">
            {games.slice(0, 4).map((game) => {
              const artwork = getGameArtwork(game.slug);
              return (
                <Link className="release-card" href={"/games/" + game.slug} key={game.id}>
                  {artwork && (
                    <Image
                      className="release-card-image"
                      src={artwork.src}
                      alt=""
                      fill
                      sizes="(max-width: 620px) 100vw, (max-width: 920px) 50vw, 25vw"
                    />
                  )}
                  <time>{game.releaseDate ? formatDate(game.releaseDate) : "LIVE"}</time>
                  <h3>{game.title}</h3>
                  <p>{game.platforms.slice(0, 3).join(" · ")}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="shell">
          <SectionHeading
            index="04"
            title="Practical guides"
            copy="Work through a tricky mechanic, get comfortable with a new game, or fix a habit that keeps costing you rounds."
            href="/articles"
            linkLabel="All stories"
          />
          <div className="article-grid">
            {(guides.length ? guides : articles.slice(0, 3)).map((article, index) => (
              <ArticleCard key={article.id} article={article} prominent={index === 0} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
