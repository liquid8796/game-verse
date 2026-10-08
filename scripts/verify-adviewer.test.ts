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
    expect(batContent).toContain("[22] Hau tuong tac sau khi xem quang cao [Post-ad engagement]");
    expect(batContent).toContain("%ARG_DEEP_ENGAGE% %ARG_DEEP_RATIO% %ARG_SCROLL_BEFORE% %ARG_POST_ENGAGE%");

    const adViewerContent = readFileSync(join(root, "scripts/adViewer.mjs"), "utf8");
    expect(adViewerContent).toContain("performDeepEngagement");
    expect(adViewerContent).toContain("scrollPageToBottom");
    expect(adViewerContent).toContain("parseDeepEngagement");
    expect(adViewerContent).toContain("parseDeepEngagementRatio");
    expect(adViewerContent).toContain("parseScrollBeforeClick");
    expect(adViewerContent).toContain("parsePostAdEngagement");
    expect(adViewerContent).toContain("[Hậu tương tác]");

    const { execSync } = require("node:child_process");
    const testSnippet = `
      import { parseDeepEngagement, parseDeepEngagementRatio, parseScrollBeforeClick, parsePostAdEngagement } from './scripts/adViewer.mjs';
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
        post1: parsePostAdEngagement(['node', 'adViewer.mjs'], {}),
        post2: parsePostAdEngagement(['node', 'adViewer.mjs', '--no-post-ad-engagement'], {}),
        post3: parsePostAdEngagement(['node', 'adViewer.mjs', '--post-ad-engagement'], {}),
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
    expect(parsed.post1).toBe(true);
    expect(parsed.post2).toBe(false);
    expect(parsed.post3).toBe(true);
  });

  it("verifies anti-detect VPN option in batch launcher and adViewer module", () => {
    const batContent = readFileSync(join(root, "run-ad-viewer.bat"), "utf8");
    expect(batContent).toContain("Tuy chon Anti-Detect VPN (Proton VPN / VPN he thong)");
    expect(batContent).toContain("%ARG_ANTI_DETECT_VPN%");

    const adViewerContent = readFileSync(join(root, "scripts/adViewer.mjs"), "utf8");
    expect(adViewerContent).toContain("parseAntiDetectVpn");
    expect(adViewerContent).toContain("resolveVpnGeo");
    expect(adViewerContent).toContain("[AntiDetect VPN]");

    const { execSync } = require("node:child_process");
    const testSnippet = `
      import { parseAntiDetectVpn } from './scripts/adViewer.mjs';
      const results = {
        vpnDefault: parseAntiDetectVpn(['node', 'adViewer.mjs'], {}),
        vpnEnable: parseAntiDetectVpn(['node', 'adViewer.mjs', '--anti-detect-vpn'], {}),
        vpnDisable: parseAntiDetectVpn(['node', 'adViewer.mjs', '--no-anti-detect-vpn'], {}),
        vpnEnv0: parseAntiDetectVpn(['node', 'adViewer.mjs'], { AD_VIEWER_ANTI_DETECT_VPN: '0' }),
        vpnEnv1: parseAntiDetectVpn(['node', 'adViewer.mjs'], { AD_VIEWER_ANTI_DETECT_VPN: '1' }),
      };
      console.log(JSON.stringify(results));
    `;
    const stdout = execSync(`node --input-type=module -e "${testSnippet.replace(/\n/g, ' ')}"`, { cwd: root, encoding: "utf8" });
    const parsed = JSON.parse(stdout.trim());
    expect(parsed.vpnDefault).toBe(true);
    expect(parsed.vpnEnable).toBe(true);
    expect(parsed.vpnDisable).toBe(false);
    expect(parsed.vpnEnv0).toBe(false);
    expect(parsed.vpnEnv1).toBe(true);
  });

  it("verifies Adcash In-Page Push, Interstitial and Popunder overlay detection and targeting", () => {
    const adViewerContent = readFileSync(join(root, "scripts/adViewer.mjs"), "utf8");
    expect(adViewerContent).toContain("in-page-message");
    expect(adViewerContent).toContain("div[znid]");
    expect(adViewerContent).toContain("div[donto]");
    expect(adViewerContent).toContain("isInPagePush");
    expect(adViewerContent).toContain("isInterstitial");
    expect(adViewerContent).toContain("#goToButton");
    expect(adViewerContent).toContain("ADCASH_CONTAINER_SELECTOR");
  });

  it("verifies Zero-Mismatch Triad (Timezone Offset, Locale, Languages) in adViewer", () => {
    const { execSync } = require("node:child_process");
    const testSnippet = `
      import { getTimezoneOffsetFor, buildGeoProfile, COUNTRY_TO_LOCALE } from './scripts/adViewer.mjs';
      const jpOffset = getTimezoneOffsetFor('Asia/Tokyo', new Date('2026-01-01T00:00:00Z'));
      const vnOffset = getTimezoneOffsetFor('Asia/Ho_Chi_Minh', new Date('2026-01-01T00:00:00Z'));
      const jpProfile = buildGeoProfile('JP', 'Japan', 'Tokyo', 'Tokyo', 35.6895, 139.6917, 'Asia/Tokyo', '1.2.3.4');
      const vnProfile = buildGeoProfile('VN', 'Vietnam', 'Hanoi', 'Hanoi', 21.0285, 105.8542, 'Asia/Ho_Chi_Minh', '5.6.7.8');
      console.log(JSON.stringify({ jpOffset, vnOffset, jpProfile, vnProfile, jpLocale: COUNTRY_TO_LOCALE.JP }));
    `;
    const stdout = execSync(`node --input-type=module -e "${testSnippet.replace(/\n/g, ' ')}"`, { cwd: root, encoding: "utf8" });
    const parsed = JSON.parse(stdout.trim());
    expect(parsed.jpOffset).toBe(-540);
    expect(parsed.vnOffset).toBe(-420);
    expect(parsed.jpProfile.locale).toBe("ja-JP");
    expect(parsed.jpProfile.languages).toContain("ja-JP");
    expect(parsed.jpProfile.acceptLanguage).toContain("ja-JP");
    expect(parsed.jpProfile.timezoneOffset).toBe(-540);
    expect(parsed.vnProfile.locale).toBe("vi-VN");
    expect(parsed.vnProfile.timezoneOffset).toBe(-420);
    expect(parsed.jpLocale).toBe("ja-JP");
  });

  it("verifies scroll speed and bottom delay configuration in adViewer", () => {
    const { execSync } = require("node:child_process");
    const testSnippet = `
      import { parseScrollSpeed, parseScrollBottomDelay } from './scripts/adViewer.mjs';
      const results = {
        speedDefault: parseScrollSpeed(['node', 'adViewer.mjs'], {}),
        speedTurbo: parseScrollSpeed(['node', 'adViewer.mjs', '--scroll-speed=turbo'], {}),
        speedNormal: parseScrollSpeed(['node', 'adViewer.mjs', '--scroll-speed=normal'], {}),
        speedEnv: parseScrollSpeed(['node', 'adViewer.mjs'], { AD_VIEWER_SCROLL_SPEED: 'normal' }),
        delayDefault: parseScrollBottomDelay(['node', 'adViewer.mjs'], {}),
        delayCustom: parseScrollBottomDelay(['node', 'adViewer.mjs', '--scroll-bottom-delay=600ms'], {}),
        delayEnv: parseScrollBottomDelay(['node', 'adViewer.mjs'], { AD_VIEWER_SCROLL_BOTTOM_DELAY: '500' }),
      };
      console.log(JSON.stringify(results));
    `;
    const stdout = execSync(`node --input-type=module -e "${testSnippet.replace(/\n/g, ' ')}"`, { cwd: root, encoding: "utf8" });
    const parsed = JSON.parse(stdout.trim());
    expect(parsed.speedDefault).toBe("max");
    expect(parsed.speedTurbo).toBe("turbo");
    expect(parsed.speedNormal).toBe("normal");
    expect(parsed.speedEnv).toBe("normal");
    expect(parsed.delayDefault).toBe(400);
    expect(parsed.delayCustom).toBe(600);
    expect(parsed.delayEnv).toBe(500);
  });

  it("verifies cycle watchdog timeout configuration in adViewer", () => {
    const { execSync } = require("node:child_process");
    const testSnippet = `
      import { parseCycleTimeoutConfig } from './scripts/adViewer.mjs';
      const results = {
        cycleDefault: parseCycleTimeoutConfig(['node', 'adViewer.mjs'], {}),
        cycleCustomMs: parseCycleTimeoutConfig(['node', 'adViewer.mjs', '--cycle-timeout=120000ms'], {}),
        cycleCustomS: parseCycleTimeoutConfig(['node', 'adViewer.mjs', '--cycle-timeout=90s'], {}),
        cycleCustomM: parseCycleTimeoutConfig(['node', 'adViewer.mjs', '--cycle-timeout=2m'], {}),
        cycleEnv: parseCycleTimeoutConfig(['node', 'adViewer.mjs'], { AD_VIEWER_CYCLE_TIMEOUT_MS: '60000' }),
      };
      console.log(JSON.stringify(results));
    `;
    const stdout = execSync(`node --input-type=module -e "${testSnippet.replace(/\n/g, ' ')}"`, { cwd: root, encoding: "utf8" });
    const parsed = JSON.parse(stdout.trim());
    expect(parsed.cycleDefault).toBe(180000);
    expect(parsed.cycleCustomMs).toBe(120000);
    expect(parsed.cycleCustomS).toBe(90000);
    expect(parsed.cycleCustomM).toBe(120000);
    expect(parsed.cycleEnv).toBe(60000);
  });
});

