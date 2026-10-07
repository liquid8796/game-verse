import Link from "next/link";
import { BrandMark } from "./brand-mark";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <BrandMark />
          <p className="footer-copy">GameVerse covers the games we keep coming back to, with practical guides, features and a clear account of what’s been announced. Pick a game, find a useful story, and take it into your next session.</p>
        </div>
        <div className="footer-links">
          <Link href="/games">Games</Link>
          <Link href="/articles">Stories</Link>
          <Link href="/discover">Discover</Link>
        </div>
        <p className="footer-meta">© {new Date().getUTCFullYear()} GameVerse<br />Guides, features and game releases.</p>
      </div>
    </footer>
  );
}
