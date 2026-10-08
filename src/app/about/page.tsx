import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About GameVerse & Editorial Standards",
  description: "Meet the GameVerse approach to game guides, editorial coverage, community reviews and advertising transparency.",
  alternates: { canonical: "/about" },
};

const commitments = [
  {
    index: "01 / COVERAGE",
    title: "Information before noise.",
    copy: "GameVerse brings together game profiles, release dates, platform information, guides and deeper features. We aim to distinguish confirmed information from interpretation, and we link to primary sources when practical.",
  },
  {
    index: "02 / GUIDES",
    title: "Made to be useful.",
    copy: "Guides should help with a real decision or in-game problem, not simply repeat a press release. We favor clear steps, context, readable explanations and links to relevant game hubs.",
  },
  {
    index: "03 / REVIEWS",
    title: "Opinions belong to people.",
    copy: "Member ratings and reviews are contributed by signed-in users. Community scores are calculated from submitted member ratings, not from an invented editorial score or a single placeholder vote.",
  },
  {
    index: "04 / COMMERCIAL",
    title: "A clear line between ads and editorial.",
    copy: "GameVerse may display advertising to support the site. Paid placements and sponsored material should be identifiable as commercial content. Payment must not determine editorial rankings or community review scores.",
  },
  {
    index: "05 / ACCURACY",
    title: "A living game library.",
    copy: "Release dates, availability, features and platform support can change. Treat future release information as subject to publisher updates; consult the linked official game sources for time-sensitive decisions.",
  },
];

export default function AboutPage() {
  return (
    <main id="main" className="biz-interior">
      <header className="biz-interior-hero">
        <div className="shell">
          <p className="biz-section-label">GAMEVERSE / ABOUT & STANDARDS</p>
          <h1>THE STORY <em>BEHIND THE SIGNAL.</em></h1>
          <p>We want a better kind of gaming destination: one that helps players discover games, understand them, and keep track of what matters after the headlines move on.</p>
        </div>
      </header>
      <section className="shell biz-interior-content" aria-label="Editorial principles">
        {commitments.map((item) => (
          <div className="biz-statement" key={item.index}>
            <span>{item.index}</span>
            <div><h2>{item.title}</h2><p>{item.copy}</p></div>
          </div>
        ))}
        <div className="biz-interior-action">
          <Link href="/articles" className="button-primary">Explore our coverage <span aria-hidden="true">↗</span></Link>
          <Link href="/partners" className="button-ghost">Commercial partnerships <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </main>
  );
}
