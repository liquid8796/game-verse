import type { Metadata } from "next";
import { ArticleCard } from "@/features/articles/components/article-card";
import { getAllArticles } from "@/server/queries/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Stories & Guides",
  description: "GameVerse news, guides, features and reviews with the answer visible from the doorway.",
  alternates: { canonical: "/articles" },
  keywords: ["game news", "gaming guides", "walkthroughs", "game reviews", "field reports", "gaming features"],
  openGraph: {
    type: "website",
    title: "Stories & Guides | GameVerse",
    description: "GameVerse news, guides, features and reviews with the answer visible from the doorway.",
    url: "/articles",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stories & Guides | GameVerse",
    description: "GameVerse news, guides, features and reviews with the answer visible from the doorway.",
  },
};

export default async function ArticlesPage() {
  const articles = await getAllArticles();
  return (
    <main id="main">
      <header className="page-hero"><div className="shell page-hero-grid">
        <div><p className="page-kicker">Stories · Guides · Features</p><h1 className="page-title">Read less. Know more.</h1></div>
        <p className="page-intro">Useful game coverage with the answer visible from the doorway. Reporting, practical guides, and perspective without feed-shaped filler.</p>
      </div></header>
      <section className="content-section"><div className="shell"><div className="article-grid">
        {articles.map((article, index) => <ArticleCard key={article.id} article={article} prominent={index === 0} />)}
      </div></div></section>
    </main>
  );
}
