import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();

describe("AdViewer runner integrity", () => {
  it("has the Windows batch launcher configured for GameVerse", () => {
    const batPath = join(root, "run-ad-viewer.bat");
    expect(existsSync(batPath)).toBe(true);
    const batContent = readFileSync(batPath, "utf8");
    expect(batContent).toContain("GAMEVERSE - AD-VIEWER");
    expect(batContent).toContain("node scripts/adViewer.mjs %FINAL_ARGS%");
  });

  it("has adViewer script fitted with GameVerse defaults and Adcash zone", () => {
    const viewerPath = join(root, "scripts/adViewer.mjs");
    expect(existsSync(viewerPath)).toBe(true);
    const content = readFileSync(viewerPath, "utf8");
    expect(content).toContain("https://gameverse.online");
    expect(content).toContain("gameverse.online:443");
    expect(content).toContain("msrwbncmi0");
    expect(content).toContain("https://www.google.com/search?q=gameverse");
  });

  it("includes all supporting scripts and extensions", () => {
    expect(existsSync(join(root, "scripts/adViewerFingerprint.mjs"))).toBe(true);
    expect(existsSync(join(root, "scripts/winMouse.ps1"))).toBe(true);
    expect(existsSync(join(root, "deploy/extensions/canvas-blocker/manifest.json"))).toBe(true);
  });
});
