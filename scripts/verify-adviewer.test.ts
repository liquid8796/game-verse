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
    expect(content).toContain("7gpx1rimky");
    expect(content).toContain("https://www.google.com/search?q=gameverse");
  });

  it("includes all supporting scripts and extensions", () => {
    expect(existsSync(join(root, "scripts/adViewerFingerprint.mjs"))).toBe(true);
    expect(existsSync(join(root, "scripts/winMouse.ps1"))).toBe(true);
    expect(existsSync(join(root, "deploy/extensions/canvas-blocker/manifest.json"))).toBe(true);
  });

  it("verifies deep engagement options in batch launcher and adViewer module", () => {
    const batContent = readFileSync(join(root, "run-ad-viewer.bat"), "utf8");
    expect(batContent).toContain("[19] Tuong tac sau toan trang [Deep Engagement]");
    expect(batContent).toContain("[20] Xac suat tuong tac sau [Deep Engagement Ratio]");
    expect(batContent).toContain("%ARG_DEEP_ENGAGE% %ARG_DEEP_RATIO%");

    const adViewerContent = readFileSync(join(root, "scripts/adViewer.mjs"), "utf8");
    expect(adViewerContent).toContain("performDeepEngagement");
    expect(adViewerContent).toContain("scrollPageToBottom");
    expect(adViewerContent).toContain("parseDeepEngagement");
    expect(adViewerContent).toContain("parseDeepEngagementRatio");

    const { execSync } = require("node:child_process");
    const testSnippet = `
      import { parseDeepEngagement, parseDeepEngagementRatio } from './scripts/adViewer.mjs';
      const results = {
        deep1: parseDeepEngagement(['node', 'adViewer.mjs', '--deep-engagement'], {}),
        deep2: parseDeepEngagement(['node', 'adViewer.mjs', '--no-deep-engagement'], {}),
        deep3: parseDeepEngagement(['node', 'adViewer.mjs'], { AD_VIEWER_DEEP_ENGAGEMENT: '1' }),
        deep4: parseDeepEngagement(['node', 'adViewer.mjs'], {}),
        ratio1: parseDeepEngagementRatio(['node', 'adViewer.mjs', '--deep-engagement-ratio=85'], {}),
        ratio2: parseDeepEngagementRatio(['node', 'adViewer.mjs', '--deep-ratio=0.5'], {}),
        ratio3: parseDeepEngagementRatio(['node', 'adViewer.mjs'], { AD_VIEWER_DEEP_ENGAGEMENT_RATIO: '90%' }),
        ratio4: parseDeepEngagementRatio(['node', 'adViewer.mjs'], {}),
      };
      console.log(JSON.stringify(results));
    `;
    const stdout = execSync(`node --input-type=module -e "${testSnippet.replace(/\n/g, ' ')}"`, { cwd: root, encoding: "utf8" });
    const parsed = JSON.parse(stdout.trim());
    expect(parsed.deep1).toBe(true);
    expect(parsed.deep2).toBe(false);
    expect(parsed.deep3).toBe(true);
    expect(parsed.deep4).toBe(false);
    expect(parsed.ratio1).toBe(0.85);
    expect(parsed.ratio2).toBe(0.5);
    expect(parsed.ratio3).toBe(0.9);
    expect(parsed.ratio4).toBe(0.7);
  });
});
