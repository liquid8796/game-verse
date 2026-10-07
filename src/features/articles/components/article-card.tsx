import Link from "next/link";
import Image from "next/image";
import type { Article } from "../domain/article";
import { getArticleMedia } from "../lib/article-media";
import { formatDate } from "@/lib/format";

export function ArticleCard({ article, prominent = false }: { article: Article; prominent?: boolean }) {
  const media = getArticleMedia(article.id);
  return (
    <article className={prominent ? "article-card article-card-prominent" : "article-card"}>
      {media && <div className="article-card-media"><Image src={media.cover.src} alt="" fill sizes={prominent ? "(max-width: 620px) 100vw, (max-width: 920px) 100vw, 66vw" : "(max-width: 620px) 100vw, (max-width: 920px) 50vw, 33vw"} /></div>}
      <div className="article-rule" aria-hidden="true" />
      <div className="article-meta"><span>{article.type}</span><time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time><span>{article.readMinutes} min</span></div>
      <h3><Link href={"/articles/" + article.slug}>{article.title}</Link></h3>
      <p>{article.excerpt}</p>
      <Link className="text-link" href={"/articles/" + article.slug}>Read story <span aria-hidden="true">↗</span></Link>
    </article>
  );
}
