import { and, desc, eq, sql } from "drizzle-orm";
import { getDb } from "@/server/db/client";
import { gameRatings, gameReviews, users } from "@/server/db/schema";
import type { MemberReview, PublicGameReview, RatingSummary } from "../domain/review";

export async function getRatingSummary(gameId: string): Promise<RatingSummary> {
  const [row] = await getDb()
    .select({
      average: sql<number>`coalesce(avg(${gameRatings.score}), 0)::float8`,
      count: sql<number>`count(*)::int`,
    })
    .from(gameRatings)
    .where(eq(gameRatings.gameId, gameId));

  return {
    average: Number(row?.average ?? 0),
    count: Number(row?.count ?? 0),
  };
}

export async function getMemberRating(userId: string, gameId: string) {
  const [row] = await getDb()
    .select({ score: gameRatings.score })
    .from(gameRatings)
    .where(and(eq(gameRatings.userId, userId), eq(gameRatings.gameId, gameId)))
    .limit(1);
  return row?.score;
}

export async function setMemberRating(userId: string, gameId: string, score: number) {
  await getDb()
    .insert(gameRatings)
    .values({ userId, gameId, score })
    .onConflictDoUpdate({
      target: [gameRatings.userId, gameRatings.gameId],
      set: { score, updatedAt: new Date() },
    });
}

export async function removeMemberRating(userId: string, gameId: string) {
  await getDb()
    .delete(gameRatings)
    .where(and(eq(gameRatings.userId, userId), eq(gameRatings.gameId, gameId)));
}

export async function getMemberReview(userId: string, gameId: string): Promise<MemberReview | undefined> {
  const [row] = await getDb()
    .select({
      headline: gameReviews.headline,
      body: gameReviews.body,
      createdAt: gameReviews.createdAt,
      updatedAt: gameReviews.updatedAt,
    })
    .from(gameReviews)
    .where(and(eq(gameReviews.userId, userId), eq(gameReviews.gameId, gameId)))
    .limit(1);
  return row;
}

export async function listGameReviews(gameId: string): Promise<PublicGameReview[]> {
  const rows = await getDb()
    .select({
      userId: gameReviews.userId,
      username: users.username,
      displayName: users.displayName,
      headline: gameReviews.headline,
      body: gameReviews.body,
      rating: gameRatings.score,
      createdAt: gameReviews.createdAt,
      updatedAt: gameReviews.updatedAt,
    })
    .from(gameReviews)
    .innerJoin(users, eq(gameReviews.userId, users.id))
    .leftJoin(
      gameRatings,
      and(
        eq(gameRatings.userId, gameReviews.userId),
        eq(gameRatings.gameId, gameReviews.gameId),
      ),
    )
    .where(eq(gameReviews.gameId, gameId))
    .orderBy(desc(gameReviews.updatedAt));
  return rows;
}

export async function upsertMemberReview(
  userId: string,
  gameId: string,
  input: { headline: string; body: string },
) {
  await getDb()
    .insert(gameReviews)
    .values({ userId, gameId, ...input })
    .onConflictDoUpdate({
      target: [gameReviews.userId, gameReviews.gameId],
      set: { ...input, updatedAt: new Date() },
    });
}

export async function deleteMemberReview(userId: string, gameId: string) {
  await getDb()
    .delete(gameReviews)
    .where(and(eq(gameReviews.userId, userId), eq(gameReviews.gameId, gameId)));
}
