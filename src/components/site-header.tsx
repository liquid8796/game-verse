import Link from "next/link";
import { logoutAction } from "@/features/auth/actions/auth-actions";
import { getCurrentUser } from "@/features/auth/lib/session";
import { BrandMark } from "./brand-mark";

const links = [["Games", "/games"], ["Stories", "/articles"], ["Discover", "/discover"]] as const;

export async function SiteHeader() {
  const member = await getCurrentUser();
  return (
    <header className="site-header">
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="shell header-inner">
        <BrandMark compact />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
        <div className="header-actions">
          <Link className="header-search" href="/discover"><span aria-hidden="true">⌕</span>Search</Link>
          {member ? (
            <details className="member-menu">
              <summary aria-label="Open member menu">
                <span className="header-avatar" aria-hidden="true">{member.displayName.slice(0, 2).toUpperCase()}</span>
                <span>{member.displayName}</span>
              </summary>
              <div>
                <Link href="/account">Account</Link>
                <Link href="/me/library">My library</Link>
                <Link href="/me/watchlist">Watchlist</Link>
                <form action={logoutAction}><button type="submit">Sign out</button></form>
              </div>
            </details>
          ) : (
            <div className="header-auth-links">
              <Link href="/login">Sign in</Link>
              <Link href="/signup">Join</Link>
            </div>
          )}
        </div>
        <details className="mobile-nav">
          <summary aria-label="Open navigation">Menu</summary>
          <nav aria-label="Mobile navigation">
            {links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
            {member ? (
              <>
                <Link href="/account">Account</Link>
                <Link href="/me/library">My library</Link>
                <Link href="/me/watchlist">Watchlist</Link>
              </>
            ) : <Link href="/login">Sign in</Link>}
          </nav>
        </details>
      </div>
    </header>
  );
}
