import type { Article } from "@/features/articles/domain/article";
import type { Game } from "@/features/games/domain/game";

export type SearchResult =
  | { kind: "game"; slug: string; title: string; description: string }
  | { kind: "article"; slug: string; title: string; description: string };

function includesQuery(values: Array<string | null>, query: string) {
  return values.some((value) => value?.toLocaleLowerCase().includes(query));
}

export function searchContent(
  rawQuery: string,
  games: Game[],
  articles: Article[],
): SearchResult[] {
  const query = rawQuery.trim().toLocaleLowerCase();
  if (!query) return [];
  const gamesById = new Map(games.map((game) => [game.id, game]));

  const gameResults: SearchResult[] = games
    .filter((game) =>
      includesQuery(
        [game.title, game.deck, game.genre, game.developer, game.publisher],
        query,
      ),
    )
    .map((game) => ({
      kind: "game",
      slug: game.slug,
      title: game.title,
      description: game.deck,
    }));

  const articleResults: SearchResult[] = articles
    .filter((article) => {
      const relatedGame = article.gameId ? gamesById.get(article.gameId) : null;

      return includesQuery(
        [
          article.title,
          article.excerpt,
          article.body,
          article.type,
          relatedGame?.title ?? null,
          relatedGame?.genre ?? null,
        ],
        query,
      );
    })
    .map((article) => ({
      kind: "article",
      slug: article.slug,
      title: article.title,
      description: article.excerpt,
    }));

  return [...gameResults, ...articleResults];
}
