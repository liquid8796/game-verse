import Link from "next/link";
import { BrandMark } from "./brand-mark";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <BrandMark />
          <span className="footer-business-label">Gaming, decoded.</span>
          <p className="footer-copy">GameVerse is a place to discover games, read useful coverage and keep track of what matters to your next session. Built for players, with a clear separation between editorial and commercial content.</p>
          <Link className="footer-social-cta" href="/about">How we work <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="footer-links">
          <span>THE PLATFORM</span>
          <Link href="/games">Game database</Link>
          <Link href="/articles">Stories & guides</Link>
          <Link href="/discover">Discover</Link>
          <Link href="/signup">Player account</Link>
        </div>
        <div className="footer-links">
          <span>GAMEVERSE</span>
          <Link href="/about">About & standards</Link>
          <Link href="/partners">Partnerships</Link>
          <Link href="/me/calendar">Release calendar</Link>
          <Link href="/me/feed">For You feed</Link>
        </div>
        <p className="footer-meta">© {new Date().getUTCFullYear()} GameVerse<br />Gaming intelligence & player tools.</p>
      </div>
      <div className="shell footer-address-bar">
        <span className="footer-address-label">Business address</span>
        <address className="footer-address">2000 Strand Rd, Unit 2405, Cranberry Township, PA 16066</address>
      </div>
    </footer>
  );
}
