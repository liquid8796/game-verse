import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "GameVerse Partnerships",
  description: "Explore possible advertising and brand collaborations with GameVerse and our editorial boundaries.",
  alternates: { canonical: "/partners" },
};

const options = [
  { index: "01 / DISPLAY", title: "Advertising space", copy: "Contextual placements alongside game directories and editorial coverage. Placement details and suitability depend on the actual campaign and available inventory." },
  { index: "02 / EDITORIAL", title: "Clearly marked sponsorships", copy: "Relevant sponsored stories or campaigns may be considered with explicit disclosure, review of fit, and clear separation from independent editorial judgments." },
  { index: "03 / EXPERIENCE", title: "Useful collaborations", copy: "Audience-first formats are welcome when they deliver genuine utility, such as practical player resources rather than intrusive interruptions." },
];

export default function PartnersPage() {
  const email = process.env.GAMEVERSE_PARTNERS_EMAIL?.trim();
  const contactHref = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ? "mailto:" + email + "?subject=" + encodeURIComponent("GameVerse partnership enquiry")
    : undefined;

  return (
    <main id="main" className="biz-interior">
      <header className="biz-interior-hero">
        <div className="shell">
          <p className="biz-section-label">GAMEVERSE / BUSINESS</p>
          <h1>BUILT FOR PLAYERS. <em>OPEN TO IDEAS.</em></h1>
          <p>GameVerse is building a home for gaming discovery, useful coverage and personal game tracking. We welcome relevant commercial opportunities that respect the player experience.</p>
        </div>
      </header>
      <section className="shell biz-interior-content" aria-label="Collaboration possibilities">
        <div className="biz-section-label" style={{ marginBottom: 30 }}>
          <span>WAYS TO COLLABORATE</span><span>SUBJECT TO EDITORIAL FIT AND AVAILABILITY</span>
        </div>
        <div className="biz-partner-offers">
          {options.map((item) => (
            <article className="biz-partner-offer" key={item.index}>
              <span>{item.index}</span>
              <h2>{item.title}</h2>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
        <div className="biz-partner-note">
          <strong>Trust is part of the product.</strong> We do not sell community ratings, manipulate game rankings for sponsors, or present commercial material as independent reporting. Reach and audience figures should be shared only when verified; no estimated impressions or partnership logos are published here.
        </div>
        <div className="biz-statement" style={{ marginTop: 70 }}>
          <span>GET IN TOUCH /</span>
          <div>
            <h2>Let’s build something relevant.</h2>
            <p>Tell us which games and players your proposal is for, the intended format, and your timeline. Commercial enquiries are handled separately from public community ratings and reviews.</p>
            <div className="biz-interior-action">
              {contactHref ? (
                <a href={contactHref} className="button-primary">Send a partnership enquiry <span aria-hidden="true">↗</span></a>
              ) : (
                <p>Our business enquiry inbox is being configured. Contact details will appear here when it is ready.</p>
              )}
              <Link href="/about" className="button-ghost">Read editorial standards <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
