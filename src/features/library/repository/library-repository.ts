import { and, desc, eq } from "drizzle-orm";
import { getDb } from "@/server/db/client";
import { gameRowToDomain } from "@/server/db/mappers";
import { gameLibrary, games } from "@/server/db/schema";
import type { LibraryEntry, LibraryStatus } from "../domain/library";

export async function getLibraryStatus(userId: string, gameId: string) {
  const [row] = await getDb()
    .select({ status: gameLibrary.status })
    .from(gameLibrary)
    .where(and(eq(gameLibrary.userId, userId), eq(gameLibrary.gameId, gameId)))
    .limit(1);
  return row?.status;
}

export async function listLibrary(userId: string): Promise<LibraryEntry[]> {
  const rows = await getDb()
    .select({
      game: games,
      status: gameLibrary.status,
      addedAt: gameLibrary.addedAt,
      updatedAt: gameLibrary.updatedAt,
    })
    .from(gameLibrary)
    .innerJoin(games, eq(gameLibrary.gameId, games.id))
    .where(eq(gameLibrary.userId, userId))
    .orderBy(desc(gameLibrary.updatedAt));

  return rows.map((row) => ({
    game: gameRowToDomain(row.game),
    status: row.status,
    addedAt: row.addedAt,
    updatedAt: row.updatedAt,
  }));
}

export async function setLibraryStatus(
  userId: string,
  gameId: string,
  status: LibraryStatus,
) {
  await getDb()
    .insert(gameLibrary)
    .values({ userId, gameId, status })
    .onConflictDoUpdate({
      target: [gameLibrary.userId, gameLibrary.gameId],
      set: { status, updatedAt: new Date() },
    });
}

export async function removeLibraryEntry(userId: string, gameId: string) {
  await getDb()
    .delete(gameLibrary)
    .where(and(eq(gameLibrary.userId, userId), eq(gameLibrary.gameId, gameId)));
}
