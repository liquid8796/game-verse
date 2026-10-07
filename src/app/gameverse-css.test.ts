import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const css = readFileSync(join(process.cwd(), "src/app/gameverse.css"), "utf8");

describe("article prose accessibility styles", () => {
  it("does not float the first letter because floated drop caps collapse spoken word spacing", () => {
    const rule = css.match(/\.prose p:first-child::first-letter\{([^}]*)\}/)?.[1];

    expect(rule).toBeDefined();
    expect(rule).not.toMatch(/float\s*:\s*left/);
  });
});

describe("release card artwork containment", () => {
  it("keeps Next Image fill artwork inside each release card", () => {
    const rule = css.match(/\.release-card\{([^}]*)\}/)?.[1];

    expect(rule).toBeDefined();
    expect(rule).toMatch(/position\s*:\s*relative/);
    expect(rule).toMatch(/overflow\s*:\s*hidden/);
  });
});
