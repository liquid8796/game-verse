import type { Metadata } from "next";
import { MemberNav } from "@/features/auth/components/member-nav";
import { ProfileForm } from "@/features/auth/components/profile-form";
import { requireCurrentUser } from "@/features/auth/lib/session";

export const metadata: Metadata = {
  title: "Account",
  robots: { index: false, follow: false },
};

export default async function AccountPage() {
  const member = await requireCurrentUser("/account");
  const joined = new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(member.createdAt);

  return (
    <main id="main" className="member-page">
      <section className="shell member-page-head">
        <div>
          <p className="page-kicker">Member profile</p>
          <h1 className="page-title">Your <span>identity.</span></h1>
        </div>
        <div className="member-identity-card">
          <div className="member-avatar" aria-hidden="true">{member.displayName.slice(0, 2).toUpperCase()}</div>
          <div>
            <strong>{member.displayName}</strong>
            <span>@{member.username}</span>
          </div>
          <small>Joined {joined}</small>
        </div>
      </section>
      <div className="shell"><MemberNav active="profile" /></div>
      <section className="shell member-account-grid">
        <div className="member-settings-panel">
          <div className="member-panel-index">PROFILE / 01</div>
          <h2>Profile settings</h2>
          <p className="member-panel-intro">This identity will follow you into ratings, reviews and future community features.</p>
          <ProfileForm member={member} />
        </div>
        <aside className="member-status-panel">
          <div className="member-panel-index">ACCOUNT / LIVE</div>
          <dl>
            <div><dt>Email</dt><dd>{member.email}</dd></div>
            <div><dt>Session</dt><dd>Secure · 30 days</dd></div>
            <div><dt>Profile</dt><dd>Private member data</dd></div>
          </dl>
          <p>The next member modules will appear here as they unlock: library, watchlist, saved stories, notifications, calendar and feed.</p>
        </aside>
      </section>
    </main>
  );
}
