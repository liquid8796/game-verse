import { createHmac, randomUUID } from "node:crypto";
import { and, desc, eq, gte, or, sql } from "drizzle-orm";
import { getDb } from "@/server/db/client";
import { businessInquiries } from "@/server/db/schema";
import type { BusinessInquiry } from "./validation";

export function fingerprintRequest(ip: string, email: string): string {
  const secret = process.env.GAMEVERSE_INQUIRY_HASH_KEY ?? process.env.DATABASE_URL ?? "gameverse-local";
  return createHmac("sha256", secret).update(ip + "|" + email).digest("hex");
}

export async function saveBusinessInquiry(input: BusinessInquiry, fingerprint: string) {
  const db = getDb();
  const since = new Date(Date.now() - 60 * 60 * 1000);
  const [counts] = await db.select({ total: sql<number>`count(*)::int` }).from(businessInquiries)
    .where(and(gte(businessInquiries.createdAt, since),
      or(eq(businessInquiries.email, input.email), eq(businessInquiries.fingerprint, fingerprint))));
  if (Number(counts?.total ?? 0) >= 3) return { accepted: false as const };
  const id = randomUUID();
  await db.insert(businessInquiries).values({ ...input, id, fingerprint });
  return { accepted: true as const, id };
}

export async function listBusinessInquiries() {
  return getDb().select({
    id: businessInquiries.id,
    name: businessInquiries.name,
    email: businessInquiries.email,
    company: businessInquiries.company,
    website: businessInquiries.website,
    kind: businessInquiries.kind,
    budget: businessInquiries.budget,
    message: businessInquiries.message,
    status: businessInquiries.status,
    createdAt: businessInquiries.createdAt,
  }).from(businessInquiries).orderBy(desc(businessInquiries.createdAt)).limit(100);
}
