import Link from "next/link";

export function SectionHeading({ index, title, copy, href, linkLabel }: {
  index: string; title: string; copy?: string; href?: string; linkLabel?: string;
}) {
  return (
    <div className="section-heading">
      <span className="section-index">{index}</span>
      <div><h2>{title}</h2>{copy && <p>{copy}</p>}</div>
      {href && linkLabel && <Link className="text-link" href={href}>{linkLabel} <span aria-hidden="true">↗</span></Link>}
    </div>
  );
}
