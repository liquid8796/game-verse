import { readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";

const extensions = new Set([".ts", ".tsx", ".js", ".jsx", ".css", ".md"]);
const corruptedMarkers = [
  /\u00e2[\u2020\u20ac\u0152\u2014]/u,
  /\u00c2\u00b7/u,
  /\ufffd/u,
];

function sourceFiles(folder: string): string[] {
  return readdirSync(folder, { withFileTypes: true }).flatMap((entry) => {
    const path = join(folder, entry.name);
    if (entry.isDirectory()) return sourceFiles(path);
    return [...extensions].some((extension) => path.endsWith(extension)) ? [path] : [];
  });
}

describe("GameVerse source text encoding", () => {
  it("does not contain UTF-8 text accidentally decoded as a Windows code page", () => {
    const root = join(process.cwd(), "src");
    const broken = sourceFiles(root).filter((file) =>
      corruptedMarkers.some((pattern) => pattern.test(readFileSync(file, "utf8"))),
    ).map((file) => relative(process.cwd(), file));
    expect(broken).toEqual([]);
  });
});