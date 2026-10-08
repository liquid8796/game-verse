import type { Metadata } from "next";
import Link from "next/link";
import { BusinessInquiryForm } from "@/features/business-inquiries/business-inquiry-form";

export const metadata: Metadata = {
  title: "Business & Partnerships — GameVerse",
  description: "Explore GameVerse commercial opportunities, advertising formats and send a business enquiry.",
  alternates: { canonical: "/partners" },
};

const services = [
  { number: "01", name: "Display advertising", detail: "Contextual placements across high-intent game hubs and editorial pages, with clear separation from the content." },
  { number: "02", name: "Sponsored stories", detail: "Brand collaborations that are transparently labeled and reviewed for relevance to the player audience." },
  { number: "03", name: "Campaign activations", detail: "Bespoke initiatives around releases, game discovery and useful player resources — designed to complement the experience." },
];

export default function PartnersPage() {
  return (
    <main id="main" className="biz-interior">
      <header className="biz-interior-hero partner-hero">
        <div className="shell">
          <p className="biz-section-label">GAMEVERSE / BUSINESS PARTNERSHIPS <span>PLAYER-FIRST GAMING MEDIA</span></p>
          <h1>PLAYERS FIRST. <em>GROWTH BUILT IN.</em></h1>
          <p>GameVerse brings together game discovery, editorial coverage and account-based player tools. Partner with a gaming media business built around useful experiences and long-term trust.</p>
          <a href="#contact" className="button-primary">DISCUSS A PARTNERSHIP <span aria-hidden="true">↗</span></a>
        </div>
      </header>

      <section className="shell partner-business-overview" aria-label="GameVerse business overview">
        <div className="partner-metric-aside"><span className="partner-label">OUR BUSINESS MODEL</span><h2>CONTENT × COMMUNITY × COMMERCE.</h2><p>Contextual advertising, relevant sponsored formats and collaborations that respect the editorial experience. We share verified inventory and campaign details directly during discussions.</p><Link href="/about">Our editorial principles <span aria-hidden="true">↗</span></Link></div>
      </section>

      <section className="shell biz-interior-content" aria-label="Partnership opportunities">
        <div className="biz-section-label"><span>01 / COMMERCIAL FORMATS</span><span>BUILT AROUND THE PLAYER</span></div>
        <div className="biz-partner-offers partner-offers">
          {services.map((service) => <article className="biz-partner-offer" key={service.number}>
            <span>{service.number} / GAMEVERSE</span><h2>{service.name}</h2><p>{service.detail}</p>
          </article>)}
        </div>
        <div className="biz-partner-note"><strong>Commercial transparency matters.</strong> Paid placements must be clearly disclosed. Sponsorships do not influence user ratings, community review scores or independent editorial judgment. We never present unverified reach, growth, or partner logos as confirmed performance.</div>
      </section>

      <section id="contact" className="partner-contact-section" aria-labelledby="partner-form-heading">
        <div className="shell partner-contact-layout">
          <div className="partner-contact-copy">
            <span className="biz-section-label">02 / START A CONVERSATION</span>
            <h2 id="partner-form-heading">LET&apos;S MAKE <em>AN IMPACT.</em></h2>
            <p>Tell us who you represent, what you want to achieve and when. Your enquiry will go to our private business inbox — no signup needed.</p>
            <div className="partner-contact-steps">
              <div><span>01 /</span><strong>Tell us about the opportunity.</strong></div>
              <div><span>02 /</span><strong>We review fit and feasibility.</strong></div>
              <div><span>03 /</span><strong>We discuss the right next step.</strong></div>
            </div>
          </div>
          <BusinessInquiryForm />
        </div>
      </section>
    </main>
  );
}
