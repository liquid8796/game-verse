import { desc, eq } from "drizzle-orm";
import type { ArticleRepository } from "@/features/articles/repository/article-repository";
import { getDb } from "../client";
import { articleRowToDomain } from "../mappers";
import { articles } from "../schema";

export class PostgresArticleRepository implements ArticleRepository {
  async list() {
    const rows = await getDb()
      .select()
      .from(articles)
      .orderBy(desc(articles.publishedAt));
    return rows.map(articleRowToDomain);
  }

  async findBySlug(slug: string) {
    const [row] = await getDb()
      .select()
      .from(articles)
      .where(eq(articles.slug, slug))
      .limit(1);
    return row ? articleRowToDomain(row) : null;
  }

  async listForGame(gameId: string) {
    const rows = await getDb()
      .select()
      .from(articles)
      .where(eq(articles.gameId, gameId))
      .orderBy(desc(articles.publishedAt));
    return rows.map(articleRowToDomain);
  }
}
