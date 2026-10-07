import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { seedArticles } from "@/server/db/seed-data";
import { getEditorialHeadings } from "@/components/editorial-body";
import { getArticleMedia } from "./article-media";

describe("published article media", () => {
  it("provides a usable local cover for every published article", () => {
    for (const article of seedArticles) {
      const media = getArticleMedia(article.id);
      expect(media, article.slug).toBeDefined();
      for (const image of [media!.cover, ...(media!.illustrations ?? []).map((item) => item.image)]) {
        expect(existsSync(join(process.cwd(), "public", image.src)), image.src).toBe(true);
        expect(image.width).toBeGreaterThan(0);
        expect(image.height).toBeGreaterThan(0);
        expect(image.alt.trim().length).toBeGreaterThan(0);
        expect(image.credit.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it("places each inline illustration in a section that exists in its article", () => {
    for (const article of seedArticles) {
      const headings = getEditorialHeadings(article.body).map((item) => item.title);
      for (const illustration of getArticleMedia(article.id)?.illustrations ?? []) {
        expect(headings, article.slug).toContain(illustration.afterSection);
      }
    }
  });
});
