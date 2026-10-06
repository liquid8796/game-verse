import Link from "next/link";
import type { Article } from "../domain/article";
import { formatDate } from "@/lib/format";

export function ArticleCard({ article, prominent = false }: { article: Article; prominent?: boolean }) {
  return (
    <article className={prominent ? "article-card article-card-prominent" : "article-card"}>
      <div className="article-rule" aria-hidden="true" />
      <div className="article-meta"><span>{article.type}</span><time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time><span>{article.readMinutes} min</span></div>
      <h3><Link href={"/articles/" + article.slug}>{article.title}</Link></h3>
      <p>{article.excerpt}</p>
      <Link className="text-link" href={"/articles/" + article.slug}>Read story <span aria-hidden="true">↗</span></Link>
    </article>
  );
}
