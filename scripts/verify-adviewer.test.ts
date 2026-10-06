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
    expect(content).toContain("1zmakzh6c");
    expect(content).toContain("https://www.google.com/search?q=gameverse");
  });

  it("includes all supporting scripts and extensions", () => {
    expect(existsSync(join(root, "scripts/adViewerFingerprint.mjs"))).toBe(true);
    expect(existsSync(join(root, "scripts/winMouse.ps1"))).toBe(true);
    expect(existsSync(join(root, "deploy/extensions/canvas-blocker/manifest.json"))).toBe(true);
  });

  it("verifies deep engagement and scroll before click options in batch launcher and adViewer module", () => {
    const batContent = readFileSync(join(root, "run-ad-viewer.bat"), "utf8");
    expect(batContent).toContain("[19] Tuong tac lau voi website [Deep Engagement]");
    expect(batContent).toContain("[20] Xac suat tuong tac lau [Deep Engagement Ratio]");
    expect(batContent).toContain("[21] Cuon trang truoc khi click quang cao [Scroll before ad click]");
    expect(batContent).toContain("%ARG_DEEP_ENGAGE% %ARG_DEEP_RATIO% %ARG_SCROLL_BEFORE%");

    const adViewerContent = readFileSync(join(root, "scripts/adViewer.mjs"), "utf8");
    expect(adViewerContent).toContain("performDeepEngagement");
    expect(adViewerContent).toContain("scrollPageToBottom");
    expect(adViewerContent).toContain("parseDeepEngagement");
    expect(adViewerContent).toContain("parseDeepEngagementRatio");
    expect(adViewerContent).toContain("parseScrollBeforeClick");
    expect(adViewerContent).toContain("[Hậu tương tác]");

    const { execSync } = require("node:child_process");
    const testSnippet = `
      import { parseDeepEngagement, parseDeepEngagementRatio, parseScrollBeforeClick } from './scripts/adViewer.mjs';
      const results = {
        deep1: parseDeepEngagement(['node', 'adViewer.mjs', '--deep-engagement'], {}),
        deep2: parseDeepEngagement(['node', 'adViewer.mjs', '--no-deep-engagement'], {}),
        deep3: parseDeepEngagement(['node', 'adViewer.mjs', '--deep-engagement=single-page'], {}),
        deep4: parseDeepEngagement(['node', 'adViewer.mjs'], { AD_VIEWER_DEEP_ENGAGEMENT: 'single' }),
        deep5: parseDeepEngagement(['node', 'adViewer.mjs'], {}),
        ratio1: parseDeepEngagementRatio(['node', 'adViewer.mjs', '--deep-engagement-ratio=85'], {}),
        ratio2: parseDeepEngagementRatio(['node', 'adViewer.mjs', '--deep-ratio=0.5'], {}),
        ratio3: parseDeepEngagementRatio(['node', 'adViewer.mjs'], { AD_VIEWER_DEEP_ENGAGEMENT_RATIO: '90%' }),
        ratio4: parseDeepEngagementRatio(['node', 'adViewer.mjs'], {}),
        scroll1: parseScrollBeforeClick(['node', 'adViewer.mjs'], {}),
        scroll2: parseScrollBeforeClick(['node', 'adViewer.mjs', '--no-scroll-before-click'], {}),
        scroll3: parseScrollBeforeClick(['node', 'adViewer.mjs', '--scroll-before-click'], {}),
      };
      console.log(JSON.stringify(results));
    `;
    const stdout = execSync(`node --input-type=module -e "${testSnippet.replace(/\n/g, ' ')}"`, { cwd: root, encoding: "utf8" });
    const parsed = JSON.parse(stdout.trim());
    expect(parsed.deep1).toBe("all-tabs");
    expect(parsed.deep2).toBe("none");
    expect(parsed.deep3).toBe("single-page");
    expect(parsed.deep4).toBe("single-page");
    expect(parsed.deep5).toBe("none");
    expect(parsed.ratio1).toBe(0.85);
    expect(parsed.ratio2).toBe(0.5);
    expect(parsed.ratio3).toBe(0.9);
    expect(parsed.ratio4).toBe(0.7);
    expect(parsed.scroll1).toBe(true);
    expect(parsed.scroll2).toBe(false);
    expect(parsed.scroll3).toBe(true);
  });
});
