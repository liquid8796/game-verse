import type { Metadata } from "next";
import { ArticleCard } from "@/features/articles/components/article-card";
import { getAllArticles } from "@/server/queries/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Stories & Guides",
  description: "Practical game guides and features, with worked examples, clear explanations and links to original sources.",
  alternates: { canonical: "/articles" },
  keywords: ["game news", "gaming guides", "walkthroughs", "game reviews", "field reports", "gaming features"],
  openGraph: {
    type: "website",
    title: "Stories & Guides | GameVerse",
    description: "Practical game guides and features, with worked examples, clear explanations and links to original sources.",
    url: "/articles",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stories & Guides | GameVerse",
    description: "Practical game guides and features, with worked examples, clear explanations and links to original sources.",
  },
};

export default async function ArticlesPage() {
  const articles = await getAllArticles();
  return (
    <main id="main">
      <header className="page-hero"><div className="shell page-hero-grid">
        <div><p className="page-kicker">Guides · Features · Explainers</p><h1 className="page-title">More to the game.</h1></div>
        <p className="page-intro">A good guide explains why a decision works, then helps you try it. Find practical advice for your next session, a closer look at the games you know, and the confirmed details behind upcoming releases.</p>
      </div></header>
      <section className="content-section"><div className="shell"><div className="article-grid">
        {articles.map((article, index) => <ArticleCard key={article.id} article={article} prominent={index === 0} />)}
      </div></div></section>
    </main>
  );
}
