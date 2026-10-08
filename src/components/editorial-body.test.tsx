import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EditorialBody, getEditorialHeadings, getIllustrationAnchor } from "./editorial-body";
import { seedArticles } from "@/server/db/seed-data";
import { getArticleMedia } from "@/features/articles/lib/article-media";

describe("editorial reading", () => {
  it("renders sections, lists and linked sources as accessible content", () => {
    const body = "Opening paragraph.\n\n## Before you play\n\n- Check your platform.\n- Read the [official guide](https://example.com/guide).\n\n## Before you play\n\nA second section.";
    render(<EditorialBody body={body} />);
    const headings = screen.getAllByRole("heading", { level: 2, name: "Before you play" });
    expect(headings[0].id).not.toBe(headings[1].id);
    expect(getEditorialHeadings(body).map((heading) => heading.id)).toEqual(headings.map((heading) => heading.id));
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByRole("link", { name: "official guide" })).toHaveAttribute("href", "https://example.com/guide");
    expect(screen.getByText("Opening paragraph.")).toBeVisible();
  });

  it("keeps authored HTML and unsafe link schemes as plain text", () => {
    const { container } = render(<EditorialBody body={'<script>alert(1)</script>\n\n[Unsafe](javascript:alert)\n\n## A heading'} headingLevel={3} />);
    expect(container.querySelector("script")).toBeNull();
    expect(screen.queryByRole("link")).toBeNull();
    expect(screen.getByText("<script>alert(1)</script>")).toBeVisible();
    expect(screen.getByRole("heading", { level: 3, name: "A heading" })).toBeVisible();
  });

  it("places a supporting figure after its section without changing heading anchors", () => {
    const body = "Opening.\n\n## Read the map\n\nFirst paragraph.\n\nLast paragraph.\n\n## Make a plan\n\nNext section.";
    const { container } = render(<EditorialBody body={body} illustrations={[{
      afterSection: "Read the map",
      image: { src: "/diagram.svg", alt: "A map example", width: 1200, height: 720, caption: "Keep track of the route.", credit: "GameVerse" },
    }]} />);
    const figure = container.querySelector("figure")!;
    expect(figure.previousElementSibling).toHaveTextContent("Last paragraph.");
    expect(figure.nextElementSibling).toHaveTextContent("Make a plan");
    expect(screen.getByRole("img", { name: "A map example" })).toBeVisible();
    expect(screen.getByRole("heading", { name: "Read the map" }).id).toBe(getEditorialHeadings(body)[0].id);
  });

  it("inserts an image beside the relevant paragraph instead of waiting until the section ends", () => {
    const body = "## Read the map\n\nA route to the bridge.\n\n- Pack supplies.\n\nA different route.\n\n## Next section\n\nContinue.";
    const illustration = {
      afterSection: "Read the map",
      afterParagraph: 1,
      image: { src: "/bridge.webp", alt: "The bridge route", width: 1600, height: 900, caption: "The route discussed above.", credit: "GameVerse" },
    };
    const { container } = render(<EditorialBody body={body} illustrations={[illustration]} />);
    const figure = container.querySelector("figure")!;
    expect(figure.previousElementSibling).toHaveTextContent("A route to the bridge.");
    expect(figure.nextElementSibling?.tagName).toBe("UL");
    expect(screen.getByText("A different route.")).toBeVisible();
    expect(getIllustrationAnchor(body, { ...illustration, afterParagraph: 2 })).toBe(3);
    expect(getIllustrationAnchor(body, { ...illustration, afterParagraph: 3 })).toBeUndefined();
  });

  it("renders every published story's illustrations inside the prose rather than as covers", () => {
    for (const article of seedArticles) {
      const illustrations = getArticleMedia(article.id, article.gameId)!.illustrations!;
      const { container, unmount } = render(<EditorialBody body={article.body} illustrations={illustrations} />);
      expect(container.querySelectorAll(".prose > .article-figure"), article.slug).toHaveLength(illustrations.length);
      expect(container.querySelector(".article-figure-cover"), article.slug).toBeNull();
      const images = [...container.querySelectorAll(".prose > .article-figure img")];
      expect(images.map((image) => image.getAttribute("alt")), article.slug).toEqual(illustrations.map((item) => item.image.alt));
      unmount();
    }
  });
});
