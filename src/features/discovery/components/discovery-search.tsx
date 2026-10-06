"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Article } from "@/features/articles/domain/article";
import type { Game } from "@/features/games/domain/game";
import { searchContent } from "../lib/search-content";

export function DiscoverySearch({ games, articles }: { games: Game[]; articles: Article[] }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchContent(query, games, articles), [query, games, articles]);
  const blank = !query.trim();
  return (
    <div className="discover-search">
      <label className="discover-input"><span aria-hidden="true">⌕</span>
        <input autoFocus type="search" value={query} onChange={(event) => setQuery(event.target.value)}
          aria-label="Search GameVerse" placeholder="Try “VALORANT”, “shooter”, “crosshair”…" /><kbd>/</kbd>
      </label>
      {blank ? (
        <div className="discover-prompt">
          <span className="prompt-glyph" aria-hidden="true">↳</span><p>Search games, genres, studios and guides.</p>
          <div>
            <button type="button" onClick={() => setQuery("GTA VI")}>GTA VI</button>
            <button type="button" onClick={() => setQuery("shooter")}>Shooter</button>
            <button type="button" onClick={() => setQuery("guide")}>Guides</button>
          </div>
        </div>
      ) : results.length ? (
        <div className="discover-results" aria-live="polite">
          <p>{results.length} matches</p>
          {results.map((result) => (
            <Link key={result.kind + result.slug}
              href={result.kind === "game" ? "/games/" + result.slug : "/articles/" + result.slug}
              aria-label={result.title}>
              <span>{result.kind}</span><strong>{result.title}</strong><p>{result.description}</p><i aria-hidden="true">↗</i>
            </Link>
          ))}
        </div>
      ) : (
        <div className="empty-state" aria-live="polite"><strong>No signal found for “{query}”.</strong><span>Try a broader game, genre, studio, or guide topic.</span></div>
      )}
    </div>
  );
}
