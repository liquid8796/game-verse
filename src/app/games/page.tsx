import type { Metadata } from "next";
import { GamesDirectory } from "@/features/games/components/games-directory";
import { getAllGames } from "@/server/queries/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Games Directory",
  description: "Browse the mainstream games currently in the GameVerse signal. Scores, genres, platforms and connected stories.",
  alternates: { canonical: "/games" },
  keywords: ["games directory", "games index", "popular games", "PC games", "console games", "GameVerse"],
  openGraph: {
    type: "website",
    title: "Games Directory | GameVerse",
    description: "Browse the mainstream games currently in the GameVerse signal.",
    url: "/games",
  },
  twitter: {
    card: "summary_large_image",
    title: "Games Directory | GameVerse",
    description: "Browse the mainstream games currently in the GameVerse signal.",
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
            <h1 className="page-title">Find your next world.</h1>
          </div>
          <p className="page-intro">
            Search the games players are actually talking about. Filter the signal,
            then jump into guides and coverage without fighting a wiki maze.
          </p>
        </div>
      </header>
      <div className="shell"><GamesDirectory games={games} /></div>
    </main>
  );
}
