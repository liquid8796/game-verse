import { eq } from "drizzle-orm";
import type { GameRepository } from "@/features/games/repository/game-repository";
import { getDb } from "../client";
import { gameRowToDomain } from "../mappers";
import { games } from "../schema";

export class PostgresGameRepository implements GameRepository {
  async list() {
    const rows = await getDb().select().from(games);
    return rows.map(gameRowToDomain);
  }

  async findBySlug(slug: string) {
    const [row] = await getDb()
      .select()
      .from(games)
      .where(eq(games.slug, slug))
      .limit(1);
    return row ? gameRowToDomain(row) : null;
  }
}
