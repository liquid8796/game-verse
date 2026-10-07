import type { Metadata } from "next";
import { DiscoverySearch } from "@/features/discovery/components/discovery-search";
import { getAllArticles, getAllGames } from "@/server/queries/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Discover",
  description: "Instant search across GameVerse games, studios, genres, guides, and stories.",
  alternates: { canonical: "/discover" },
  keywords: ["search games", "gaming discovery", "games and guides", "GameVerse search"],
  openGraph: {
    type: "website",
    title: "Discover | GameVerse",
    description: "Instant search across GameVerse games, studios, genres, guides, and stories.",
    url: "/discover",
  },
  twitter: {
    card: "summary_large_image",
    title: "Discover | GameVerse",
    description: "Search games, guides, and stories across GameVerse.",
  },
};

export default async function DiscoverPage() {
  const [games, articles] = await Promise.all([getAllGames(), getAllArticles()]);

  return (
    <main id="main">
      <section className="discover-wrap">
        <div className="shell">
          <p className="page-kicker">Games and stories</p>
          <h1 className="page-title">What are you looking for?</h1>
          <p className="discover-intro">Search for a game, studio, genre or guide topic. You’ll find game pages alongside the stories that explain them, so you can move from a question to something worth reading.</p>
          <DiscoverySearch games={games} articles={articles} />
        </div>
      </section>
    </main>
  );
}
