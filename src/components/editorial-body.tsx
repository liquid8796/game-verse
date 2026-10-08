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

function editorialBlocks(body: string) {
  return body.trim().split(/\n\s*\n/).filter(Boolean);
}

function isBulletBlock(block: string) {
  return block.split("\n").every((line) => line.startsWith("- "));
}

export function getIllustrationAnchor(body: string, illustration: ArticleIllustration): number | undefined {
  const blocks = editorialBlocks(body);
  const headings = getEditorialHeadings(body);
  const matches = headings.filter((heading) => heading.title === illustration.afterSection);
  if (matches.length !== 1) return undefined;
  const heading = matches[0];
  const nextHeading = headings.find((item) => item.index > heading.index);
  const end = nextHeading?.index ?? blocks.length;
  if (illustration.afterParagraph === undefined) return end - 1;
  if (!Number.isInteger(illustration.afterParagraph) || illustration.afterParagraph < 1) return undefined;
  const paragraphs = blocks.slice(heading.index + 1, end).flatMap((block, offset) =>
    isBulletBlock(block) ? [] : [heading.index + 1 + offset],
  );
  return paragraphs[illustration.afterParagraph - 1];
}

/** Editorial text and contextual figures, with stable section anchors. */
export function EditorialBody({ body, headingLevel = 2, illustrations = [] }: { body: string; headingLevel?: 2 | 3; illustrations?: ArticleIllustration[] }) {
  const headingList = getEditorialHeadings(body);
  const headings = new Map(headingList.map((heading) => [heading.index, heading]));
  const Heading = headingLevel === 3 ? "h3" : "h2";
  const blocks = editorialBlocks(body);
  const positionedImages = illustrations.map((illustration) => ({
    illustration,
    anchor: getIllustrationAnchor(body, illustration),
  }));

  return (
    <div className="prose">
      {blocks.map((block, index) => {
        const heading = headings.get(index);
        const lines = block.split("\n");
        const content = heading
          ? <Heading id={heading.id}>{heading.title}</Heading>
          : isBulletBlock(block)
            ? <ul>{lines.map((line, item) => <li key={item}>{inlineLinks(line.slice(2))}</li>)}</ul>
            : <p>{lines.map((line, item) => <Fragment key={item}>{item > 0 && " "}{inlineLinks(line)}</Fragment>)}</p>;
        const sectionImages = positionedImages.filter((item) => item.anchor === index);
        return <Fragment key={index}>{content}{sectionImages.map(({ illustration }) => <ArticleFigure key={illustration.image.src} image={illustration.image} />)}</Fragment>;
      })}
    </div>
  );
}
