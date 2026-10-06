import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/ad-slot";
import { getCurrentUser } from "@/features/auth/lib/session";
import { SaveArticleControl } from "@/features/saved/components/save-article-control";
import { isArticleSaved } from "@/features/saved/repository/saved-repository";
import { formatDate } from "@/lib/format";
import { getSiteUrl } from "@/lib/site-url";
import { getArticleBySlug } from "@/server/queries/content";

export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Story not found" };

  const canonical = "/articles/" + article.slug;
  return {
    title: article.title,
    description: article.excerpt,
    keywords: [
      article.type,
      article.author,
      "gaming story",
      "game guide",
      "GameVerse",
    ],
    alternates: { canonical },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      publishedTime: article.publishedAt,
      url: canonical,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();
  const member = await getCurrentUser();
  const saved = member ? await isArticleSaved(member.id, article.id) : false;

  const siteUrl = getSiteUrl();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: { "@type": "Person", name: article.author },
    publisher: {
      "@type": "Organization",
      name: "GameVerse",
      url: siteUrl,
    },
    mainEntityOfPage: siteUrl + "/articles/" + article.slug,
  };

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Stories", item: siteUrl + "/articles" },
      { "@type": "ListItem", position: 3, name: article.title, item: siteUrl + "/articles/" + article.slug },
    ],
  };

  return (
    <main id="main" className="article-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <article className="shell">
        <header className="article-page-head">
          <p className="page-kicker">{article.type}</p>
          <h1>{article.title}</h1>
          <p className="standfirst">{article.excerpt}</p>
          <div className="byline">
            <span>By {article.author}</span>
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
            <span>{article.readMinutes} minute read</span>
          </div>
          {member && (
            <SaveArticleControl
              articleId={article.id}
              slug={article.slug}
              saved={saved}
            />
          )}
        </header>
        <AdSlot name="article-top" />
        <div className="prose">
          {article.body.split("\n\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <AdSlot name="article-bottom" format="rectangle" />
      </article>
    </main>
  );
}
