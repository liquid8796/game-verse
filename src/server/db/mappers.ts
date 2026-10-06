import type { Article } from "@/features/articles/domain/article";
import type { Game } from "@/features/games/domain/game";
import type { ArticleRow, GameRow } from "./schema";

export function gameRowToDomain(row: GameRow): Game {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    deck: row.deck,
    genre: row.genre,
    developer: row.developer,
    publisher: row.publisher,
    releaseDate: row.releaseDate,
    status: row.status,
    platforms: row.platforms,
    score: row.score,
    heat: row.heat,
    accent: row.accent,
    heroVariant: row.heroVariant,
  };
}

export function articleRowToDomain(row: ArticleRow): Article {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    body: row.body,
    type: row.type,
    gameId: row.gameId,
    author: row.author,
    publishedAt: row.publishedAt.toISOString(),
    readMinutes: row.readMinutes,
    featured: row.featured,
  };
}
