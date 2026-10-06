import type { Article } from "@/features/articles/domain/article";

export type FeedSignalSource = "watchlist" | "library" | "saved";

export interface FeedSignal {
  gameId: string;
  source: FeedSignalSource;
  weight: number;
}

export interface PersonalizedFeedItem {
  article: Article;
  score: number;
  sources: FeedSignalSource[];
}

function freshnessScore(publishedAt: string, now: Date) {
  const ageDays = Math.max(
    0,
    (now.getTime() - new Date(publishedAt).getTime()) / (24 * 60 * 60 * 1000),
  );
  return Math.max(0, 30 - ageDays);
}

export function buildPersonalizedFeed(
  articles: Article[],
  signals: FeedSignal[],
  savedArticleIds: Set<string>,
  now = new Date(),
): PersonalizedFeedItem[] {
  const byGame = new Map<string, { weight: number; sources: Set<FeedSignalSource> }>();

  for (const signal of signals) {
    const current = byGame.get(signal.gameId) ?? {
      weight: 0,
      sources: new Set<FeedSignalSource>(),
    };
    current.weight += signal.weight;
    current.sources.add(signal.source);
    byGame.set(signal.gameId, current);
  }

  return articles
    .flatMap((article) => {
      if (!article.gameId) return [];
      const signal = byGame.get(article.gameId);
      if (!signal) return [];

      const score =
        signal.weight * 100 +
        freshnessScore(article.publishedAt, now) +
        (article.featured ? 8 : 0) -
        (savedArticleIds.has(article.id) ? 12 : 0);

      return [{
        article,
        score,
        sources: [...signal.sources],
      }];
    })
    .sort((a, b) => b.score - a.score || b.article.publishedAt.localeCompare(a.article.publishedAt));
}
