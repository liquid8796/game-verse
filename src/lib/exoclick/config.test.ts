import { describe, expect, it } from "vitest";
import {
  EXOCLICK_CLASS,
  EXOCLICK_CLASS_IN_PAGE_PUSH,
  EXOCLICK_CLASS_MOBILE,
  EXOCLICK_CLASS_PUSH_NOTIFICATIONS,
  EXOCLICK_CLASS_VIDEO_SLIDER,
  EXOCLICK_CLIENT_HINTS,
  EXOCLICK_PROVIDER_SRC,
  EXOCLICK_PROVIDER_SRC_MAGSRV,
  EXOCLICK_PUSH_DOMAIN,
  EXOCLICK_SERVING_DOMAIN,
  EXOCLICK_SERVING_DOMAIN_MAGSRV,
  EXOCLICK_SITE_VERIFICATION,
  EXOCLICK_ZONE_IN_PAGE_PUSH,
  EXOCLICK_ZONE_INTERSTITIAL,
  EXOCLICK_ZONE_INTERSTITIAL_MOBILE,
  EXOCLICK_ZONE_POPUNDER,
  EXOCLICK_ZONE_POPUNDER_SECONDARY,
  EXOCLICK_ZONE_POPUNDER_MOBILE_2,
  EXOCLICK_ZONE_PUSH_NOTIFICATIONS,
  EXOCLICK_ZONE_VIDEO_SLIDER,
  exoclickEnabled,
} from "./config";

describe("ExoClick Configuration", () => {
  it("defines exact zone credentials and script resources", () => {
    expect(EXOCLICK_ZONE_INTERSTITIAL).toBe("6051238");
    expect(EXOCLICK_ZONE_INTERSTITIAL_MOBILE).toBe("6051310");
    expect(EXOCLICK_ZONE_VIDEO_SLIDER).toBe("6051312");
    expect(EXOCLICK_ZONE_PUSH_NOTIFICATIONS).toBe("6051314");
    expect(EXOCLICK_ZONE_IN_PAGE_PUSH).toBe("6051316");
    expect(EXOCLICK_ZONE_POPUNDER).toBe("6051294");
    expect(EXOCLICK_ZONE_POPUNDER_SECONDARY).toBe("6051308");
    expect(EXOCLICK_ZONE_POPUNDER_MOBILE_2).toBe("6052144");
    expect(EXOCLICK_CLASS).toBe("eas6a97888e35");
    expect(EXOCLICK_CLASS_MOBILE).toBe("eas6a97888e33");
    expect(EXOCLICK_CLASS_VIDEO_SLIDER).toBe("eas6a97888e31");
    expect(EXOCLICK_CLASS_PUSH_NOTIFICATIONS).toBe("eas6a97888e29");
    expect(EXOCLICK_CLASS_IN_PAGE_PUSH).toBe("eas6a97888e42");
    expect(EXOCLICK_PROVIDER_SRC).toBe("https://a.pemsrv.com/ad-provider.js");
    expect(EXOCLICK_PROVIDER_SRC_MAGSRV).toBe("https://a.magsrv.com/ad-provider.js");
    expect(EXOCLICK_SERVING_DOMAIN).toBe("https://s.pemsrv.com");
    expect(EXOCLICK_SERVING_DOMAIN_MAGSRV).toBe("https://s.magsrv.com");
    expect(EXOCLICK_PUSH_DOMAIN).toBe("https://js.wpnsrv.com");
    expect(EXOCLICK_SITE_VERIFICATION).toBe("87c58674c7eabd0e162f44e609b0a49c");
  });

  it("defines complete Client Hints meta header targeting the serving domain", () => {
    expect(EXOCLICK_CLIENT_HINTS).toContain("https://s.pemsrv.com");
    expect(EXOCLICK_CLIENT_HINTS).toContain("Sec-CH-UA");
    expect(EXOCLICK_CLIENT_HINTS).toContain("Sec-CH-UA-Mobile");
    expect(EXOCLICK_CLIENT_HINTS).toContain("Sec-CH-UA-Platform");
    expect(EXOCLICK_CLIENT_HINTS).toContain("Sec-CH-UA-Full-Version-List");
  });

  it("checks enabled status correctly based on environment variables", () => {
    expect(exoclickEnabled({})).toBe(false);
    expect(exoclickEnabled({ NEXT_PUBLIC_ADS_ENABLED: "true" })).toBe(true);
    expect(exoclickEnabled({ NEXT_PUBLIC_EXOCLICK_ENABLED: "true" })).toBe(true);
    expect(
      exoclickEnabled({
        NEXT_PUBLIC_ADS_ENABLED: "true",
        EXOCLICK_DISABLED: "true",
      }),
    ).toBe(false);
    expect(
      exoclickEnabled({
        NEXT_PUBLIC_ADS_ENABLED: "true",
        EXOCLICK_DISABLED: "1",
      }),
    ).toBe(false);
  });
});
