import { and, desc, eq } from "drizzle-orm";
import { getDb } from "@/server/db/client";
import { articleRowToDomain } from "@/server/db/mappers";
import { articles, savedArticles } from "@/server/db/schema";

export async function isArticleSaved(userId: string, articleId: string) {
  const [row] = await getDb()
    .select({ articleId: savedArticles.articleId })
    .from(savedArticles)
    .where(and(eq(savedArticles.userId, userId), eq(savedArticles.articleId, articleId)))
    .limit(1);
  return Boolean(row);
}

export async function listSavedArticles(userId: string) {
  const rows = await getDb()
    .select({ article: articles, savedAt: savedArticles.savedAt })
    .from(savedArticles)
    .innerJoin(articles, eq(savedArticles.articleId, articles.id))
    .where(eq(savedArticles.userId, userId))
    .orderBy(desc(savedArticles.savedAt));

  return rows.map((row) => ({
    article: articleRowToDomain(row.article),
    savedAt: row.savedAt,
  }));
}

export async function saveArticle(userId: string, articleId: string) {
  await getDb()
    .insert(savedArticles)
    .values({ userId, articleId })
    .onConflictDoNothing();
}

export async function unsaveArticle(userId: string, articleId: string) {
  await getDb()
    .delete(savedArticles)
    .where(and(eq(savedArticles.userId, userId), eq(savedArticles.articleId, articleId)));
}
