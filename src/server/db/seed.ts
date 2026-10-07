import { getDb, getPool } from "./client";
import { seedArticles, seedGames } from "./seed-data";
import { articles, games } from "./schema";

async function seed() {
  const db = getDb();

  for (const game of seedGames) {
    const row = {
      ...game,
      updatedAt: new Date(game.updatedAt ?? Date.now()),
    };
    await db
      .insert(games)
      .values(row)
      .onConflictDoUpdate({ target: games.id, set: row });
  }

  for (const article of seedArticles) {
    const row = {
      ...article,
      publishedAt: new Date(article.publishedAt),
      updatedAt: new Date(article.updatedAt ?? Date.now()),
    };
    await db
      .insert(articles)
      .values(row)
      .onConflictDoUpdate({ target: articles.id, set: row });
  }
}

seed()
  .then(async () => {
    await getPool().end();
    process.stdout.write("GameVerse seed complete\n");
  })
  .catch(async (error) => {
    console.error("GameVerse seed failed", error);
    await getPool().end().catch(() => undefined);
    process.exitCode = 1;
  });
