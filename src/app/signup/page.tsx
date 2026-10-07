import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthForm } from "@/features/auth/components/auth-form";
import { getCurrentUser } from "@/features/auth/lib/session";

export const metadata: Metadata = {
  title: "Create account",
  robots: { index: false, follow: false },
};

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const currentUser = await getCurrentUser();
  if (currentUser) redirect("/account");
  const { next = "/account" } = await searchParams;

  return (
    <main id="main" className="member-auth-page">
      <section className="shell member-auth-shell">
        <div className="member-auth-copy">
          <p className="page-kicker">Join GameVerse</p>
          <h1>Keep your games <em>together.</em></h1>
          <p>Save stories for later, keep track of what you’re playing, and follow games you want to try. Create an account to build your own library and share reviews with other players.</p>
          <div className="member-benefit-strip" aria-label="Member benefits">
            <span>Library</span><span>Watchlist</span><span>Alerts</span><span>Personal feed</span>
          </div>
        </div>
        <div className="member-auth-panel">
          <div className="member-panel-index">01 / CREATE PROFILE</div>
          <AuthForm mode="signup" next={next} />
        </div>
      </section>
    </main>
  );
}
