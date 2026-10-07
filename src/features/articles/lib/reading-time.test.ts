import { describe, expect, it } from "vitest";
import { estimateReadingMinutes } from "./reading-time";

describe("reader-facing time estimates", () => {
  it("keeps a 440-word story at two minutes when headings and links are formatted", () => {
    const body = "## Guide\n\n" + "word ".repeat(437) + "\n\n- [Official source](https://example.com/a-very-long-url)";
    expect(estimateReadingMinutes(body)).toBe(2);
    expect(estimateReadingMinutes(body + "\n\nExtra.")).toBe(3);
  });

  it("gives a short or empty story a minimum one-minute estimate", () => {
    expect(estimateReadingMinutes("")).toBe(1);
    expect(estimateReadingMinutes("One useful paragraph.")).toBe(1);
  });
});
