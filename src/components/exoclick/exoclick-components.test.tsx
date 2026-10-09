import { render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { ExoClickHead } from "./ExoClickHead";
import { ExoClickInterstitial } from "./ExoClickInterstitial";
import { ExoClickPopunder } from "./ExoClickPopunder";

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

    const popRes = render(<ExoClickPopunder />);
    expect(popRes.container.innerHTML).toBe("");
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

  it("renders popunder containers and anti-adblock inline scripts when enabled", () => {
    process.env.NEXT_PUBLIC_ADS_ENABLED = "true";
    const { container } = render(<ExoClickPopunder />);
    const outerWrapper = container.querySelector("#exoclick-popunder-container");
    expect(outerWrapper).not.toBeNull();

    const wrapper1 = container.querySelector("#exoclick-popunder-container-6051294");
    expect(wrapper1).not.toBeNull();
    expect(wrapper1?.getAttribute("data-zoneid")).toBe("6051294");

    const wrapper2 = container.querySelector("#exoclick-popunder-container-6051308");
    expect(wrapper2).not.toBeNull();
    expect(wrapper2?.getAttribute("data-zoneid")).toBe("6051308");

    const scripts = container.querySelectorAll("script");
    expect(scripts.length).toBe(2);

    expect(scripts[0]?.textContent).toContain("6051294");
    expect(scripts[0]?.textContent).toContain("popMagic");
    expect(scripts[0]?.textContent).toContain("popunder1000.js");
    expect(scripts[0]?.textContent).toContain("creativeDisplayed-6051294");

    expect(scripts[1]?.textContent).toContain("6051308");
    expect(scripts[1]?.textContent).toContain("popMagic");
    expect(scripts[1]?.textContent).toContain("popunder1000.js");
    expect(scripts[1]?.textContent).toContain("creativeDisplayed-6051308");
  });
});
