/**
 * Cấu hình mạng quảng cáo Adcash:
 * AutoTag (zoneId: 'msrwbncmi0') theo yêu cầu phê duyệt trang web GameVerse.
 *
 * Bước 1: <script id="aclib" type="text/javascript" src="//acscdn.com/script/aclib.js"></script>
 * Bước 2: <script type="text/javascript">aclib.runAutoTag({ zoneId: 'msrwbncmi0' });</script>
 */
export const ADCASH_AUTOTAG_ZONE_ID = "msrwbncmi0" as const;
export const ADCASH_ZONE_ID = ADCASH_AUTOTAG_ZONE_ID;

export const ADCASH_LIB_SRC = "//acscdn.com/script/aclib.js" as const;

export type AdcashEnvironment = Readonly<Record<string, string | undefined>>;

const DISABLED_VALUES = new Set(["1", "true", "yes", "on"]);

export function adcashEnabled(env: AdcashEnvironment = process.env): boolean {
  const disabled = DISABLED_VALUES.has(
    String(env.ADCASH_DISABLED ?? "").trim().toLowerCase(),
  );
  if (disabled) return false;
  return env.NEXT_PUBLIC_ADS_ENABLED === "true";
}
