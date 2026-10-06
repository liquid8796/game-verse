import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthForm } from "@/features/auth/components/auth-form";
import { getCurrentUser } from "@/features/auth/lib/session";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
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
          <p className="page-kicker">Member access</p>
          <h1>Return to your <em>signal.</em></h1>
          <p>Your library, alerts, saved stories and personal feed live behind one secure account.</p>
        </div>
        <div className="member-auth-panel">
          <div className="member-panel-index">01 / SIGN IN</div>
          <AuthForm mode="login" next={next} />
        </div>
      </section>
    </main>
  );
}
