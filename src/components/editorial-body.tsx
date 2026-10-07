import { Fragment, type ReactNode } from "react";

export function getEditorialHeadings(body: string) {
  return body.trim().split(/\n\s*\n/).flatMap((block, index) => {
    if (!block.startsWith("## ")) return [];
    const title = block.slice(3).trim();
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    return [{ title, id: `section-${index}-${slug}`, index }];
  });
}

function inlineLinks(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  let cursor = 0;
  for (const match of text.matchAll(pattern)) {
    parts.push(text.slice(cursor, match.index));
    parts.push(<a key={match.index} href={match[2]}>{match[1]}</a>);
    cursor = match.index! + match[0].length;
  }
  parts.push(text.slice(cursor));
  return parts;
}

/** Small, text-only editorial format: headings, bullet lists and source links. */
export function EditorialBody({ body, headingLevel = 2 }: { body: string; headingLevel?: 2 | 3 }) {
  const headings = new Map(getEditorialHeadings(body).map((heading) => [heading.index, heading]));
  const Heading = headingLevel === 3 ? "h3" : "h2";

  return (
    <div className="prose">
      {body.trim().split(/\n\s*\n/).filter(Boolean).map((block, index) => {
        const heading = headings.get(index);
        if (heading) return <Heading id={heading.id} key={index}>{heading.title}</Heading>;
        const lines = block.split("\n");
        if (lines.every((line) => line.startsWith("- "))) {
          return <ul key={index}>{lines.map((line, item) => <li key={item}>{inlineLinks(line.slice(2))}</li>)}</ul>;
        }
        return <p key={index}>{lines.map((line, item) => <Fragment key={item}>{item > 0 && " "}{inlineLinks(line)}</Fragment>)}</p>;
      })}
    </div>
  );
}
