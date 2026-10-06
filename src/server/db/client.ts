import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

let pool: Pool | undefined;
let database: ReturnType<typeof drizzle<typeof schema>> | undefined;

export function getPool(): Pool {
  if (pool) return pool;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is required for GameVerse persistence");
  }

  pool = new Pool({
    connectionString,
    max: 8,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 5_000,
  });

  return pool;
}

export function getDb() {
  if (!database) {
    database = drizzle(getPool(), { schema });
  }
  return database;
}

export async function pingDatabase(): Promise<void> {
  await getPool().query("select 1");
}
