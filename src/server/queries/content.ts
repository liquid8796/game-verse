import { cache } from "react";
import { rankGames } from "@/features/games/lib/rank-games";
import { PostgresArticleRepository } from "@/server/db/repositories/postgres-article-repository";
import { PostgresGameRepository } from "@/server/db/repositories/postgres-game-repository";

const gameRepository = new PostgresGameRepository();
const articleRepository = new PostgresArticleRepository();

export const getAllGames = cache(async () => rankGames(await gameRepository.list()));
export const getAllArticles = cache(async () => articleRepository.list());
export const getGameBySlug = cache((slug: string) => gameRepository.findBySlug(slug));
export const getArticleBySlug = cache((slug: string) =>
  articleRepository.findBySlug(slug),
);
export const getArticlesForGame = cache((gameId: string) =>
  articleRepository.listForGame(gameId),
);

export const getHomeData = cache(async () => {
  const [games, articles] = await Promise.all([getAllGames(), getAllArticles()]);
  return { games, articles };
});
