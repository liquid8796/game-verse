import { and, eq, gt, ne } from "drizzle-orm";
import { getDb } from "@/server/db/client";
import { sessions, users } from "@/server/db/schema";
import type { Member } from "../domain/member";

function toMember(user: typeof users.$inferSelect): Member {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    displayName: user.displayName,
    bio: user.bio,
    createdAt: user.createdAt,
  };
}

export async function findUserByEmail(email: string) {
  const [user] = await getDb().select().from(users).where(eq(users.email, email)).limit(1);
  return user;
}

export async function findUserByUsername(username: string) {
  const [user] = await getDb().select().from(users).where(eq(users.username, username)).limit(1);
  return user;
}

export async function usernameBelongsToAnotherUser(username: string, userId: string) {
  const [user] = await getDb()
    .select({ id: users.id })
    .from(users)
    .where(and(eq(users.username, username), ne(users.id, userId)))
    .limit(1);
  return Boolean(user);
}

export async function createUser(input: {
  id: string;
  email: string;
  username: string;
  displayName: string;
  passwordHash: string;
}) {
  const [user] = await getDb().insert(users).values(input).returning();
  return user;
}

export async function updateUserProfile(
  userId: string,
  input: { username: string; displayName: string; bio: string },
) {
  const [user] = await getDb()
    .update(users)
    .set({ ...input, updatedAt: new Date() })
    .where(eq(users.id, userId))
    .returning();
  return user ? toMember(user) : undefined;
}

export async function createSession(input: {
  tokenHash: string;
  userId: string;
  expiresAt: Date;
}) {
  await getDb().insert(sessions).values(input);
}

export async function deleteSession(tokenHash: string) {
  await getDb().delete(sessions).where(eq(sessions.tokenHash, tokenHash));
}

export async function findMemberBySession(tokenHash: string, now = new Date()) {
  const [row] = await getDb()
    .select({ user: users })
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .where(and(eq(sessions.tokenHash, tokenHash), gt(sessions.expiresAt, now)))
    .limit(1);

  return row ? toMember(row.user) : undefined;
}
