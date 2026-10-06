"use client";

import { useMemo, useState } from "react";
import type { Game } from "../domain/game";
import { GameCard } from "./game-card";

export function GamesDirectory({ games }: { games: Game[] }) {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("All");
  const genres = useMemo(() => ["All", ...Array.from(new Set(games.map((game) => game.genre))).sort()], [games]);
  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    return games.filter((game) => {
      const genreMatch = genre === "All" || game.genre === genre;
      const queryMatch = !needle || [game.title, game.deck, game.developer, game.genre]
        .some((value) => value.toLocaleLowerCase().includes(needle));
      return genreMatch && queryMatch;
    });
  }, [games, genre, query]);

  return (
    <div className="directory">
      <div className="directory-controls">
        <label className="search-field"><span aria-hidden="true">⌕</span>
          <input type="search" aria-label="Search games" placeholder="Search title, studio, genre…"
            value={query} onChange={(event) => setQuery(event.target.value)} />
        </label>
        <div className="filter-row" aria-label="Filter games by genre">
          {genres.map((item) => <button type="button" key={item} aria-pressed={genre === item}
            onClick={() => setGenre(item)}>{item}</button>)}
        </div>
      </div>
      <p className="result-count" aria-live="polite">{filtered.length} game{filtered.length === 1 ? "" : "s"} in signal</p>
      {filtered.length ? (
        <div className="game-grid">{filtered.map((game, index) => <GameCard key={game.id} game={game} index={index} />)}</div>
      ) : (
        <div className="empty-state"><strong>No games matched that signal.</strong><span>Try a title, studio, or a broader genre.</span></div>
      )}
    </div>
  );
}
