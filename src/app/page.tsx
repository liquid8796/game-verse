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

const channels = [
  { index: "01", title: "Game database", copy: "Release dates, platforms, studios and the context that matters before you dive in.", href: "/games", action: "Explore games" },
  { index: "02", title: "Guides & features", copy: "Practical walkthroughs, thoughtful analysis and stories worth your time.", href: "/articles", action: "Read stories" },
  { index: "03", title: "Discover", copy: "Find coverage across titles, genres and the games on your radar.", href: "/discover", action: "Start exploring" },
  { index: "04", title: "Your GameVerse", copy: "Track what you play, save what matters and build your own release calendar.", href: "/signup", action: "Create an account" },
] as const;

export default async function Home() {
  const { games, articles } = await getHomeData();
  const spotlight = games.find((game) => game.slug === "gta-vi") ?? games[0];
  if (!spotlight) return null;

  const spotlightArtwork = getGameArtwork(spotlight.slug);
  const feature = articles.find((article) => article.slug === "why-minecraft-keeps-winning") ?? articles[0];
  const featureGame = feature?.gameId ? games.find((game) => game.id === feature.gameId) : undefined;
  const featureArtwork = featureGame ? getGameArtwork(featureGame.slug) : undefined;
  const guides = articles.filter((article) => article.type === "guide");
  const selectedStories = [...guides, ...articles.filter((article) => article.type !== "guide")].slice(0, 3);
  const upcoming = games.filter((game) => game.status === "upcoming" && game.releaseDate).slice(0, 4);
  const releaseGames = [...upcoming, ...games.filter((game) => !upcoming.some((item) => item.id === game.id))].slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "GameVerse",
    url: getSiteUrl(),
    description: "Gaming coverage, game intelligence and a personal hub for the games you play.",
};

  return (
    <main id="main" className="site-main business-home">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="biz-hero" aria-labelledby="biz-hero-title">
        <HeroWorld accent={spotlight.accent} imageSrc={spotlightArtwork?.src} />
        <div className="shell biz-hero-inner">
          <div className="biz-hero-topline">
            <span><i aria-hidden="true" /> GameVerse / Gaming, decoded.</span>
            <span>THE PLAYER-FIRST GAMING PLATFORM</span>
          </div>
          <div className="biz-hero-grid">
            <div className="biz-hero-copy">
              <p className="biz-eyebrow">The games. The context. Your next move.</p>
              <h1 id="biz-hero-title">PLAY <em>BEYOND</em> THE HYPE.</h1>
              <p className="biz-hero-description">
                Discover what is worth playing. Follow the releases that matter. Get guides
                that make your next session better â€” all in one place.
              </p>
              <div className="biz-hero-actions">
                <Link className="button-primary" href="/games">Explore game hubs <span aria-hidden="true">â†—</span></Link>
                <Link className="button-ghost" href="/signup">Make it yours <span aria-hidden="true">â†’</span></Link>
              </div>
            </div>
            <Link className="biz-spotlight" href={"/games/" + spotlight.slug}>
              <div className="biz-spotlight-index"><span>In focus / 001</span><span aria-hidden="true">â†—</span></div>
              <span className="biz-spotlight-label">Featured game briefing</span>
              <strong>{spotlight.title}</strong>
              <span className="biz-spotlight-description">{spotlight.deck}</span>
              <span className="biz-spotlight-bottom">{spotlight.releaseDate ? formatDate(spotlight.releaseDate) : spotlight.status} <span>{spotlight.platforms.slice(0, 2).join(" / ")}</span></span>
            </Link>
          </div>
          <div className="biz-hero-bottom">
            <span>ONE PLACE FOR WHAT YOU PLAY.</span>
            <span className="biz-scroll-hint">Scroll to explore <span aria-hidden="true">â†“</span></span>
          </div>
        </div>
      </section>

      <div className="biz-proof-rail" aria-label="Explore GameVerse coverage">
        <div className="shell biz-proof-inner">
          <div><strong>{games.length}</strong><span>Game hubs</span></div>
          <div><strong>{articles.length}</strong><span>Published stories</span></div>
          <div><strong>{guides.length}</strong><span>Practical guides</span></div>
          <p>Real game information.<br /><b>A personal space to use it.</b></p>
        </div>
      </div>

      <section className="biz-channels content-section">
        <div className="shell">
          <div className="biz-section-label"><span>01 / THE PLATFORM</span><span>THE TOOLS BEHIND EVERY SESSION</span></div>
          <div className="biz-channel-intro">
            <h2>MORE THAN <em>HEADLINES.</em></h2>
            <p>GameVerse connects useful coverage with the games you actually play. Start with a game, go deeper with a guide, and keep the important stuff close.</p>
          </div>
          <div className="biz-channel-grid">
            {channels.map((channel) => (
              <Link className="biz-channel" key={channel.index} href={channel.href}>
                <span className="biz-channel-number">{channel.index} /</span>
                <span className="biz-channel-arrow" aria-hidden="true">â†—</span>
                <strong>{channel.title}</strong>
                <p>{channel.copy}</p>
                <span className="biz-channel-action">{channel.action} <span aria-hidden="true">â†’</span></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <TrendTicker games={games} />

      <section className="content-section biz-radar">
        <div className="shell">
          <SectionHeading index="02" title="The game radar" copy="A curated window into releases and games worth knowing. Every title links to its own information hub." href="/games" linkLabel="Explore every game" />
          <div className="biz-radar-grid">
            {games.slice(0, 6).map((game, index) => {
              const artwork = getGameArtwork(game.slug);
              return (
                <Link href={"/games/" + game.slug} key={game.id} className="biz-radar-card">
                  <div className="biz-radar-image">
                    {artwork && <Image src={artwork.src} alt="" fill sizes="(max-width: 700px) 50vw, (max-width: 1000px) 33vw, 25vw" />}
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="biz-radar-info">
                    <small>{game.genre} / {game.status}</small>
                    <strong>{game.title}</strong>
                    <span>{game.platforms.slice(0, 2).join(" Â· ")}</span>
                  </div>
                  <span className="biz-radar-arrow" aria-hidden="true">â†—</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <AdSlot name="home-mid" />

      {feature && (
        <section className="content-section biz-feature-section">
          <div className="shell">
            <SectionHeading index="03" title="The long read" copy="Stories that go beyond patch notes and help explain why games matter." href="/articles" linkLabel="All stories" />
            <div className="feature-split biz-feature">
              <div className="feature-art" aria-hidden="true">
                {featureArtwork && <Image className="feature-art-image" src={featureArtwork.src} alt="" fill sizes="(max-width: 920px) 100vw, 60vw" />}
              </div>
              <div className="feature-copy">
                <span>{feature.type} / {feature.readMinutes} min read</span>
                <h3>{feature.title}</h3>
                <p>{feature.excerpt}</p>
                <Link className="text-link" href={"/articles/" + feature.slug}>Read the story <span aria-hidden="true">â†—</span></Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="content-section biz-stories">
        <div className="shell">
          <SectionHeading index="04" title="Built for better play" copy="Useful reading for players who want to understand more and waste less time searching." href="/articles" linkLabel="Browse the newsroom" />
          <div className="article-grid">
            {selectedStories.map((article, index) => <ArticleCard key={article.id} article={article} prominent={index === 0} />)}
          </div>
        </div>
      </section>

      <section className="content-section biz-releases">
        <div className="shell">
          <SectionHeading index="05" title="Next on the calendar" copy="Track upcoming releases and keep the platforms and dates together." href="/signup" linkLabel="Build your calendar" />
          <div className="release-grid">
            {releaseGames.map((game) => {
              const artwork = getGameArtwork(game.slug);
              return (
                <Link className="release-card" href={"/games/" + game.slug} key={game.id}>
                  {artwork && <Image className="release-card-image" src={artwork.src} alt="" fill sizes="(max-width: 620px) 100vw, (max-width: 920px) 50vw, 25vw" />}
                  <time>{game.releaseDate ? formatDate(game.releaseDate) : "Available now"}</time>
                  <h3>{game.title}</h3>
                  <p>{game.platforms.slice(0, 3).join(" Â· ")}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="biz-member-section">
        <div className="shell biz-member-layout">
          <div className="biz-member-copy">
            <span className="biz-section-label">06 / YOUR ACCOUNT</span>
            <h2>YOUR GAMES.<br /><em>YOUR UNIVERSE.</em></h2>
            <p>Keep the games you love in one place. Build a watchlist, save useful stories, follow your release calendar, and unlock a feed that is actually about you.</p>
            <Link href="/signup" className="button-primary">Create your free account <span aria-hidden="true">â†—</span></Link>
            <Link href="/login" className="biz-member-secondary">Already a member? Sign in <span aria-hidden="true">â†’</span></Link>
          </div>
          <div className="biz-member-preview" aria-label="Your member tools">
            <div className="biz-preview-top"><span>GAMEVERSE / PLAYER SPACE</span><span aria-hidden="true">â†—</span></div>
            <div className="biz-preview-header"><span>PERSONAL HQ</span><strong>MAKE EVERY<br />SESSION COUNT.</strong></div>
            <div className="biz-preview-rows">
              {[["01", "My game library", "Track what you play", "/me/library"], ["02", "Watchlist", "Never lose a release", "/me/watchlist"], ["03", "For You feed", "Coverage based on your games", "/me/feed"], ["04", "Release calendar", "Your upcoming games, one view", "/me/calendar"]].map(([index, title, copy, href]) => (
                <Link href={href} key={index} className="biz-preview-row"><span>{index}</span><div><strong>{title}</strong><small>{copy}</small></div><b aria-hidden="true">â†—</b></Link>
              ))}
            </div>
            <div className="biz-preview-foot">Your account. Your signal. No invented recommendations.</div>
          </div>
        </div>
      </section>

      <section className="business-growth-spotlight" aria-label="GameVerse business partnerships">
        <div className="shell business-growth-layout">
          <div className="business-growth-number">
            <span className="partner-label">GAMEVERSE / COMPANY-REPORTED REVENUE</span>
            <strong><small>$</small>30K<span> / MONTH</span></strong>
            <p>Monthly revenue reported by GameVerse.</p>
          </div>
          <div className="business-growth-copy">
            <span className="partner-label">07 / BUILT AS A BUSINESS</span>
            <h2>GAMING MEDIA.<br /><em>REAL OPPORTUNITIES.</em></h2>
            <p>Our model connects editorial content, contextual advertising and relevant brand partnerships — without compromising independent coverage or community ratings.</p>
            <Link href="/partners" className="button-primary">PARTNER WITH GAMEVERSE <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>

      <section className="biz-closing">
        <div className="shell biz-closing-grid">
          <div>
            <span>GAMEVERSE / OUR APPROACH</span>
            <h2>GOOD COVERAGE<br />EARNS YOUR TIME.</h2>
          </div>
          <div>
            <p>Clear sources. Useful guides. Honest distinction between editorial coverage and paid placements. We are building a gaming destination that players can return to for the right reasons.</p>
            <div className="biz-closing-links">
              <Link href="/about">About & editorial standards <span aria-hidden="true">â†—</span></Link>
              <Link href="/partners">Brand partnerships <span aria-hidden="true">â†—</span></Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
