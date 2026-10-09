import { render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { ExoClickHead } from "./ExoClickHead";
import { ExoClickInterstitial } from "./ExoClickInterstitial";

describe("ExoClick Components", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("does not render when ads are disabled", () => {
    process.env.NEXT_PUBLIC_ADS_ENABLED = "false";
    const headRes = render(<ExoClickHead />);
    expect(headRes.container.innerHTML).toBe("");

    const interRes = render(<ExoClickInterstitial />);
    expect(interRes.container.innerHTML).toBe("");
  });

  it("renders head client hints and preconnects when ads are enabled", () => {
    process.env.NEXT_PUBLIC_ADS_ENABLED = "true";
    render(<ExoClickHead />);
    const meta = document.head.querySelector('meta[http-equiv="Delegate-CH"]');
    expect(meta).not.toBeNull();
    expect(meta?.getAttribute("content")).toContain("https://s.pemsrv.com");
  });

  it("renders interstitial ins tag, provider script and serve push script when enabled", () => {
    process.env.NEXT_PUBLIC_ADS_ENABLED = "true";
    const { container } = render(<ExoClickInterstitial />);
    const wrapper = container.querySelector("#exoclick-interstitial-container");
    expect(wrapper).not.toBeNull();
    expect(wrapper?.getAttribute("data-zoneid")).toBe("6051238");

    const ins = container.querySelector("ins.eas6a97888e35");
    expect(ins).not.toBeNull();
    expect(ins?.getAttribute("data-zoneid")).toBe("6051238");

    // React 19 hoists <script async src="..."> to document.head, while inline script stays in container
    const providerScript = document.head.querySelector(
      'script[src="https://a.pemsrv.com/ad-provider.js"]'
    );
    expect(providerScript).not.toBeNull();

    const inlineScript = container.querySelector("script");
    expect(inlineScript).not.toBeNull();
    expect(inlineScript?.textContent).toContain("AdProvider");
    expect(inlineScript?.textContent).toContain("creativeDisplayed-6051238");
  });
});
