import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { AdSlot } from "@/components/ad-slot";
import { EditorialBody, getEditorialHeadings } from "@/components/editorial-body";
import { getCurrentUser } from "@/features/auth/lib/session";
import { ArticleFigure } from "@/features/articles/components/article-figure";
import { getArticleMedia } from "@/features/articles/lib/article-media";
import { legacyHeadingIds } from "@/features/articles/lib/legacy-heading-ids";
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
  const media = getArticleMedia(article.id, article.gameId);
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
      images: media ? [{ url: media.cover.src, alt: media.cover.alt, width: media.cover.width, height: media.cover.height }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: media ? [media.cover.src] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();
  const member = await getCurrentUser();
  const saved = member ? await isArticleSaved(member.id, article.id) : false;
  const media = getArticleMedia(article.id, article.gameId);
  const headings = getEditorialHeadings(article.body).filter((heading) => heading.title !== "Sources");

  const siteUrl = getSiteUrl();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: media ? siteUrl + media.cover.src : undefined,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
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
            {article.updatedAt && article.updatedAt.slice(0, 10) !== article.publishedAt.slice(0, 10) && (
              <span>Updated <time dateTime={article.updatedAt}>{formatDate(article.updatedAt)}</time></span>
            )}
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
        {media && <ArticleFigure image={media.cover} cover />}
        <AdSlot name="article-top" />
        {headings.length > 0 && (
          <nav className="article-contents" aria-label="In this story">
            <p>In this story</p>
            <ul>{headings.map((heading) => <li key={heading.id}><a href={"#" + heading.id}>{heading.title}</a></li>)}</ul>
          </nav>
        )}
        <EditorialBody body={article.body} illustrations={media?.illustrations} headingAliases={legacyHeadingIds[article.id]} />
        <div className="article-end"><Link className="text-link" href="/articles">← More stories and guides</Link></div>
        <AdSlot name="article-bottom" format="rectangle" />
      </article>
    </main>
  );
}
