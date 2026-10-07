import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EditorialBody, getEditorialHeadings } from "./editorial-body";

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
});
