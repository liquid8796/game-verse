import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { ArticleImage } from "@/features/articles/lib/article-media";
import { ArticleFigure } from "./article-figure";

const image: ArticleImage = {
  src: "/media/articles/hades-combat.webp",
  alt: "Zagreus faces enemies in a room with several exits.",
  width: 1920,
  height: 1080,
  caption: "Each room offers a fight and a choice of reward for the next run.",
  credit: "Supergiant Games",
  sourceUrl: "https://www.supergiantgames.com/games/hades/",
};

describe("article figures", () => {
  it("keeps the screenshot, caption and linked credit together in a native figure", () => {
    render(<ArticleFigure image={image} />);

    const figure = screen.getByRole("figure");
    const screenshot = within(figure).getByRole("img", { name: image.alt });
    expect(screenshot).toHaveAttribute("width", "1920");
    expect(screenshot).toHaveAttribute("height", "1080");
    expect(within(figure).getByText(image.caption).closest("figcaption")).not.toBeNull();
    expect(within(figure).getByRole("link", { name: image.credit })).toHaveAttribute("href", image.sourceUrl);
  });

  it("loads the cover immediately and defers images in the story", () => {
    const { rerender } = render(<ArticleFigure image={image} cover />);
    expect(screen.getByRole("img", { name: image.alt })).toHaveAttribute("loading", "eager");

    rerender(<ArticleFigure image={image} />);
    expect(screen.getByRole("img", { name: image.alt })).toHaveAttribute("loading", "lazy");
  });

  it("shows an unlinked credit when the source has no public page", () => {
    render(<ArticleFigure image={{ ...image, sourceUrl: undefined, credit: "GameVerse" }} />);
    expect(screen.getByText("Image: GameVerse")).toBeVisible();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
