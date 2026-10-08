import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCurrentUser } from "@/features/auth/lib/session";
import { listBusinessInquiries } from "@/features/business-inquiries/repository";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "GameVerse — Business Inbox",
  robots: { index: false, follow: false },
};

export default async function BusinessInbox() {
  const allowed = (process.env.GAMEVERSE_BUSINESS_ADMIN_EMAILS ?? "")
    .split(",").map((value) => value.trim().toLowerCase()).filter(Boolean);
  if (!allowed.length) notFound();
  const user = await getCurrentUser();
  if (!user || !allowed.includes(user.email.toLowerCase())) notFound();
  const entries = await listBusinessInquiries();
  return (
    <main id="main" className="biz-interior">
      <header className="biz-interior-hero"><div className="shell">
        <p className="biz-section-label">GAMEVERSE / PRIVATE BUSINESS INBOX</p>
        <h1>PARTNER <em>REQUESTS.</em></h1>
        <p>{entries.length} most recent submissions. Visible only to configured business administrators.</p>
      </div></header>
      <section className="shell biz-inbox-list" aria-label="Business enquiries">
        {entries.length === 0 ? <p>No enquiries received yet.</p> : entries.map((entry) => (
          <article key={entry.id} className="biz-inbox-entry">
            <div><span>{entry.createdAt.toISOString().slice(0, 10)}</span><h2>{entry.company}</h2><p>{entry.name} · {entry.kind} · {entry.budget}</p></div>
            <div><a href={"mailto:" + entry.email}>{entry.email}</a>{entry.website && <a href={entry.website} target="_blank" rel="noopener noreferrer">Company website ↗</a>}<p>{entry.message}</p></div>
          </article>
        ))}
      </section>
    </main>
  );
}
