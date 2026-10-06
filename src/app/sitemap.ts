import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { getAllArticles, getAllGames } from "@/server/queries/content";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [games, articles] = await Promise.all([getAllGames(), getAllArticles()]);
  const base = getSiteUrl();

  return [
    { url: base, changeFrequency: "daily", priority: 1 },
    { url: base + "/games", changeFrequency: "daily", priority: 0.9 },
    { url: base + "/articles", changeFrequency: "daily", priority: 0.9 },
    { url: base + "/discover", changeFrequency: "weekly", priority: 0.7 },
    ...games.map((game) => ({
      url: base + "/games/" + game.slug,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...articles.map((article) => ({
      url: base + "/articles/" + article.slug,
      lastModified: new Date(article.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
