import { describe, expect, it } from "vitest";
import {
  ADCASH_AUTOTAG_ZONE_ID,
  ADCASH_LIB_SRC,
  ADCASH_ZONE_ID,
  adcashEnabled,
} from "./config";

describe("Adcash configuration", () => {
  it("uses the verified autotag zone id and official script cdn", () => {
    expect(ADCASH_AUTOTAG_ZONE_ID).toBe("7gpx1rimky");
    expect(ADCASH_ZONE_ID).toBe("7gpx1rimky");
    expect(ADCASH_LIB_SRC).toBe("//acscdn.com/script/aclib.js");
  });

  it("enables ads only when NEXT_PUBLIC_ADS_ENABLED is explicitly true", () => {
    expect(adcashEnabled({ NEXT_PUBLIC_ADS_ENABLED: "true" })).toBe(true);
    expect(adcashEnabled({ NEXT_PUBLIC_ADS_ENABLED: "false" })).toBe(false);
    expect(adcashEnabled({})).toBe(false);
  });

  it("respects ADCASH_DISABLED killswitch even if NEXT_PUBLIC_ADS_ENABLED is true", () => {
    expect(
      adcashEnabled({
        NEXT_PUBLIC_ADS_ENABLED: "true",
        ADCASH_DISABLED: "true",
      }),
    ).toBe(false);
    expect(
      adcashEnabled({
        NEXT_PUBLIC_ADS_ENABLED: "true",
        ADCASH_DISABLED: "1",
      }),
    ).toBe(false);
  });
});
