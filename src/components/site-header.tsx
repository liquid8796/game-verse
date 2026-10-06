import Link from "next/link";
import { BrandMark } from "./brand-mark";

const links = [["Games", "/games"], ["Stories", "/articles"], ["Discover", "/discover"]] as const;

export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="shell header-inner">
        <BrandMark compact />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
        <Link className="header-search" href="/discover"><span aria-hidden="true">⌕</span>Search</Link>
        <details className="mobile-nav">
          <summary aria-label="Open navigation">Menu</summary>
          <nav aria-label="Mobile navigation">
            {links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
          </nav>
        </details>
      </div>
    </header>
  );
}
