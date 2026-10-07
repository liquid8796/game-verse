import { Fragment, type ReactNode } from "react";
import { ArticleFigure } from "@/features/articles/components/article-figure";
import type { ArticleIllustration } from "@/features/articles/lib/article-media";

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
export function EditorialBody({ body, headingLevel = 2, illustrations = [] }: { body: string; headingLevel?: 2 | 3; illustrations?: ArticleIllustration[] }) {
  const headingList = getEditorialHeadings(body);
  const headings = new Map(headingList.map((heading) => [heading.index, heading]));
  const Heading = headingLevel === 3 ? "h3" : "h2";
  const blocks = body.trim().split(/\n\s*\n/).filter(Boolean);
  const sectionEnds = new Map(headingList.map((heading, index) => [
    (headingList[index + 1]?.index ?? blocks.length) - 1,
    heading.title,
  ]));

  return (
    <div className="prose">
      {blocks.map((block, index) => {
        const heading = headings.get(index);
        const lines = block.split("\n");
        const content = heading
          ? <Heading id={heading.id}>{heading.title}</Heading>
          : lines.every((line) => line.startsWith("- "))
            ? <ul>{lines.map((line, item) => <li key={item}>{inlineLinks(line.slice(2))}</li>)}</ul>
            : <p>{lines.map((line, item) => <Fragment key={item}>{item > 0 && " "}{inlineLinks(line)}</Fragment>)}</p>;
        const sectionImages = illustrations.filter((item) => item.afterSection === sectionEnds.get(index));
        return <Fragment key={index}>{content}{sectionImages.map((item) => <ArticleFigure key={item.image.src} image={item.image} />)}</Fragment>;
      })}
    </div>
  );
}
