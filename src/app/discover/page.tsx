import type { Metadata } from "next";
import { DiscoverySearch } from "@/features/discovery/components/discovery-search";
import { getAllArticles, getAllGames } from "@/server/queries/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Discover",
  description: "Search GameVerse games, studios, genres, guides, and stories.",
  alternates: { canonical: "/discover" },
};

export default async function DiscoverPage() {
  const [games, articles] = await Promise.all([getAllGames(), getAllArticles()]);

  return (
    <main id="main">
      <section className="discover-wrap">
        <div className="shell">
          <p className="page-kicker">Discovery signal</p>
          <h1 className="page-title">Search the verse.</h1>
          <DiscoverySearch games={games} articles={articles} />
        </div>
      </section>
    </main>
  );
}
