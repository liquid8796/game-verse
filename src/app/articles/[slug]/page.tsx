import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/ad-slot";
import { formatDate } from "@/lib/format";
import { getSiteUrl } from "@/lib/site-url";
import { getArticleBySlug } from "@/server/queries/content";

export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Story not found" };
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: "/articles/" + article.slug },
    openGraph: { type: "article", title: article.title, description: article.excerpt, publishedTime: article.publishedAt },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();
  const jsonLd = {
    "@context": "https://schema.org", "@type": "Article", headline: article.title,
    description: article.excerpt, datePublished: article.publishedAt,
    author: { "@type": "Organization", name: article.author },
    publisher: { "@type": "Organization", name: "GameVerse" },
    mainEntityOfPage: getSiteUrl() + "/articles/" + article.slug,
  };
  return (
    <main id="main" className="article-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="shell">
        <header className="article-page-head">
          <p className="page-kicker">{article.type}</p><h1>{article.title}</h1>
          <p className="standfirst">{article.excerpt}</p>
          <div className="byline"><span>By {article.author}</span><time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time><span>{article.readMinutes} minute read</span></div>
        </header>
        <AdSlot name="article-top" />
        <div className="prose">{article.body.split("\n\n").map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
        <AdSlot name="article-bottom" format="rectangle" />
      </article>
    </main>
  );
}
