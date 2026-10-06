import type { Article } from "../domain/article";

export interface ArticleRepository {
  list(): Promise<Article[]>;
  findBySlug(slug: string): Promise<Article | null>;
  listForGame(gameId: string): Promise<Article[]>;
}
