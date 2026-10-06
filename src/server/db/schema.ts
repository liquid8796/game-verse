import {
  boolean,
  date,
  integer,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import type { ArticleType } from "@/features/articles/domain/article";
import type { GameStatus } from "@/features/games/domain/game";

export const games = pgTable("games", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  deck: text("deck").notNull(),
  genre: text("genre").notNull(),
  developer: text("developer").notNull(),
  publisher: text("publisher").notNull(),
  releaseDate: date("release_date", { mode: "string" }),
  status: text("status").$type<GameStatus>().notNull(),
  platforms: text("platforms").array().notNull(),
  score: integer("score").notNull(),
  heat: integer("heat").notNull(),
  accent: text("accent").notNull(),
  heroVariant: text("hero_variant").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const articles = pgTable("articles", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  body: text("body").notNull(),
  type: text("type").$type<ArticleType>().notNull(),
  gameId: text("game_id").references(() => games.id, { onDelete: "set null" }),
  author: text("author").notNull(),
  publishedAt: timestamp("published_at", { withTimezone: true }).notNull(),
  readMinutes: integer("read_minutes").notNull(),
  featured: boolean("featured").default(false).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export type GameRow = typeof games.$inferSelect;
export type ArticleRow = typeof articles.$inferSelect;
