import {
  boolean,
  check,
  date,
  integer,
  index,
  primaryKey,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import type { ArticleType } from "@/features/articles/domain/article";
import type { GameStatus } from "@/features/games/domain/game";
import type { LibraryStatus } from "@/features/library/domain/library";

export const games = pgTable("games", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  deck: text("deck").notNull(),
  overview: text("overview").notNull().default(""),
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

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  username: text("username").notNull().unique(),
  displayName: text("display_name").notNull(),
  passwordHash: text("password_hash").notNull(),
  bio: text("bio").notNull().default(""),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const sessions = pgTable("sessions", {
  tokenHash: text("token_hash").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  lastSeenAt: timestamp("last_seen_at", { withTimezone: true }).defaultNow().notNull(),
});

export const gameLibrary = pgTable(
  "game_library",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    gameId: text("game_id")
      .notNull()
      .references(() => games.id, { onDelete: "cascade" }),
    status: text("status").$type<LibraryStatus>().notNull(),
    addedAt: timestamp("added_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.userId, table.gameId] }),
  ],
);

export const gameWatchlist = pgTable(
  "game_watchlist",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    gameId: text("game_id")
      .notNull()
      .references(() => games.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.userId, table.gameId] }),
  ],
);

export const savedArticles = pgTable(
  "saved_articles",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    articleId: text("article_id")
      .notNull()
      .references(() => articles.id, { onDelete: "cascade" }),
    savedAt: timestamp("saved_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.userId, table.articleId] }),
  ],
);

export const notifications = pgTable("notifications", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  title: text("title").notNull(),
  body: text("body").notNull(),
  href: text("href"),
  readAt: timestamp("read_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const gameRatings = pgTable(
  "game_ratings",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    gameId: text("game_id")
      .notNull()
      .references(() => games.id, { onDelete: "cascade" }),
    score: integer("score").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.userId, table.gameId] }),
    check("game_ratings_score_check", sql`${table.score} between 1 and 10`),
  ],
);

export const gameReviews = pgTable(
  "game_reviews",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    gameId: text("game_id")
      .notNull()
      .references(() => games.id, { onDelete: "cascade" }),
    headline: text("headline").notNull(),
    body: text("body").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.userId, table.gameId] }),
  ],
);

export type GameRow = typeof games.$inferSelect;
export type ArticleRow = typeof articles.$inferSelect;
export type UserRow = typeof users.$inferSelect;


// Private contact requests for the GameVerse commercial team.
export const businessInquiries = pgTable("business_inquiries", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  company: text("company").notNull(),
  email: text("email").notNull(),
  website: text("website").notNull().default(""),
  kind: text("kind").notNull(),
  budget: text("budget").notNull(),
  message: text("message").notNull(),
  fingerprint: text("fingerprint").notNull(),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [
  index("business_inquiries_email_idx").on(table.email),
  index("business_inquiries_created_at_idx").on(table.createdAt),
]);
