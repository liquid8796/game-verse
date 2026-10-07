import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { getAllArticles, getAllGames } from "@/server/queries/content";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [games, articles] = await Promise.all([getAllGames(), getAllArticles()]);
  const base = getSiteUrl();
  const now = new Date();

  return [
    { url: base, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: base + "/games", lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: base + "/articles", lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: base + "/discover", lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    ...games.map((game) => ({
      url: base + "/games/" + game.slug,
      lastModified: game.releaseDate ? new Date(game.releaseDate) : now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...articles.map((article) => ({
      url: base + "/articles/" + article.slug,
      lastModified: new Date(article.updatedAt ?? article.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
