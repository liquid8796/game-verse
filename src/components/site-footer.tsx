import Link from "next/link";
import { BrandMark } from "./brand-mark";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <BrandMark />
          <p className="footer-copy">Mainstream games without the feed sludge. Signal first, noise last.</p>
        </div>
        <div className="footer-links">
          <Link href="/games">Games</Link>
          <Link href="/articles">Stories</Link>
          <Link href="/discover">Discover</Link>
        </div>
        <p className="footer-meta">© {new Date().getUTCFullYear()} GameVerse<br />Built for players, not refresh loops.</p>
      </div>
    </footer>
  );
}
