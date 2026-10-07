import type { Metadata } from "next";
import { GamesDirectory } from "@/features/games/components/games-directory";
import { getAllGames } from "@/server/queries/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Games Directory",
  description: "Browse games by title, studio or genre. Find platform details, game overviews, practical guides and player reviews.",
  alternates: { canonical: "/games" },
  keywords: ["games directory", "games index", "popular games", "PC games", "console games", "GameVerse"],
  openGraph: {
    type: "website",
    title: "Games Directory | GameVerse",
    description: "Game overviews, platform details, practical guides and player reviews in one directory.",
    url: "/games",
  },
  twitter: {
    card: "summary_large_image",
    title: "Games Directory | GameVerse",
    description: "Game overviews, platform details, practical guides and player reviews in one directory.",
  },
};

export default async function GamesPage() {
  const games = await getAllGames();
  return (
    <main id="main">
      <header className="page-hero">
        <div className="shell page-hero-grid">
          <div>
            <p className="page-kicker">Game index · {games.length} tracked</p>
            <h1 className="page-title">Find your next game.</h1>
          </div>
          <p className="page-intro">
            Looking for a game to play with friends, a competitive challenge or a place
            to build? Browse by title, studio or genre. Each game page explains how it
            plays, which platforms it supports and where to begin.
          </p>
        </div>
      </header>
      <div className="shell"><GamesDirectory games={games} /></div>
    </main>
  );
}
