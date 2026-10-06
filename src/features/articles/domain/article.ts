export type ArticleType = "news" | "guide" | "feature" | "review";

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  type: ArticleType;
  gameId: string | null;
  author: string;
  publishedAt: string;
  readMinutes: number;
  featured: boolean;
}
