import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/features/articles/components/article-card";
import { MemberNav } from "@/features/auth/components/member-nav";
import { requireCurrentUser } from "@/features/auth/lib/session";
import { SaveArticleControl } from "@/features/saved/components/save-article-control";
import { listSavedArticles } from "@/features/saved/repository/saved-repository";

export const metadata: Metadata = {
  title: "Saved Stories",
  robots: { index: false, follow: false },
};

export default async function SavedPage() {
  const member = await requireCurrentUser("/me/saved");
  const entries = await listSavedArticles(member.id);

  return (
    <main id="main" className="member-page member-saved-page">
      <section className="shell member-page-head">
        <div>
          <p className="page-kicker">Reading queue</p>
          <h1 className="page-title">Saved <span>stories.</span></h1>
          <p className="member-page-deck">
            Keep guides, reports and features close without closing the public web around them.
          </p>
        </div>
        <div className="member-library-total">
          <span>Saved</span>
          <strong>{entries.length}</strong>
        </div>
      </section>
      <div className="shell"><MemberNav active="saved" /></div>
      <section className="shell member-library-content">
        {entries.length ? (
          <div className="article-grid member-saved-grid">
            {entries.map((entry, index) => (
              <div className="member-saved-item" key={entry.article.id}>
                <ArticleCard article={entry.article} prominent={index === 0 && entries.length > 2} />
                <SaveArticleControl
                  articleId={entry.article.id}
                  slug={entry.article.slug}
                  saved
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="member-library-empty">
            <span>00 / QUEUED</span>
            <h2>No stories saved yet.</h2>
            <p>Save any public GameVerse story and it will wait here for your next session.</p>
            <Link className="button-primary" href="/articles">Browse stories</Link>
          </div>
        )}
      </section>
    </main>
  );
}
