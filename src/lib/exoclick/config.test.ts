import { describe, expect, it } from "vitest";
import {
  EXOCLICK_CLASS,
  EXOCLICK_CLIENT_HINTS,
  EXOCLICK_PROVIDER_SRC,
  EXOCLICK_SERVING_DOMAIN,
  EXOCLICK_SITE_VERIFICATION,
  EXOCLICK_ZONE_INTERSTITIAL,
  EXOCLICK_ZONE_POPUNDER,
  exoclickEnabled,
} from "./config";

describe("ExoClick Configuration", () => {
  it("defines exact zone credentials and script resources", () => {
    expect(EXOCLICK_ZONE_INTERSTITIAL).toBe("6051238");
    expect(EXOCLICK_ZONE_POPUNDER).toBe("6051294");
    expect(EXOCLICK_CLASS).toBe("eas6a97888e35");
    expect(EXOCLICK_PROVIDER_SRC).toBe("https://a.pemsrv.com/ad-provider.js");
    expect(EXOCLICK_SERVING_DOMAIN).toBe("https://s.pemsrv.com");
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
