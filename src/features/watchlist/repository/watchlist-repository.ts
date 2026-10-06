import { and, desc, eq } from "drizzle-orm";
import { getDb } from "@/server/db/client";
import { gameRowToDomain } from "@/server/db/mappers";
import { gameWatchlist, games } from "@/server/db/schema";

export async function isGameWatched(userId: string, gameId: string) {
  const [row] = await getDb()
    .select({ gameId: gameWatchlist.gameId })
    .from(gameWatchlist)
    .where(and(eq(gameWatchlist.userId, userId), eq(gameWatchlist.gameId, gameId)))
    .limit(1);
  return Boolean(row);
}

export async function listWatchlist(userId: string) {
  const rows = await getDb()
    .select({ game: games, createdAt: gameWatchlist.createdAt })
    .from(gameWatchlist)
    .innerJoin(games, eq(gameWatchlist.gameId, games.id))
    .where(eq(gameWatchlist.userId, userId))
    .orderBy(desc(gameWatchlist.createdAt));

  return rows.map((row) => ({
    game: gameRowToDomain(row.game),
    createdAt: row.createdAt,
  }));
}

export async function addToWatchlist(userId: string, gameId: string) {
  await getDb()
    .insert(gameWatchlist)
    .values({ userId, gameId })
    .onConflictDoNothing();
}

export async function removeFromWatchlist(userId: string, gameId: string) {
  await getDb()
    .delete(gameWatchlist)
    .where(and(eq(gameWatchlist.userId, userId), eq(gameWatchlist.gameId, gameId)));
}
