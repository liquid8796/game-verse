import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { getAllArticles, getAllGames } from "@/server/queries/content";
import { getGameArtwork } from "@/features/games/lib/game-artwork";
import { getArticleMedia } from "@/features/articles/lib/article-media";

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
    { url: base + "/about", lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: base + "/partners", lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    ...games.map((game) => ({
      url: base + "/games/" + game.slug,
      lastModified: game.updatedAt ? new Date(game.updatedAt) : now,
      images: getGameArtwork(game.slug) ? [base + getGameArtwork(game.slug).src] : undefined,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...articles.map((article) => {
      const media = getArticleMedia(article.id, article.gameId);
      return {
        url: base + "/articles/" + article.slug,
        lastModified: new Date(article.updatedAt ?? article.publishedAt),
        images: media ? [
          base + media.cover.src,
          ...(media.illustrations ?? []).map((item) => base + item.image.src),
        ] : undefined,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      };
    }),
  ];
}
