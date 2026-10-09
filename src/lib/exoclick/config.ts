/**
 * Cấu hình mạng quảng cáo ExoClick:
 * Zone: Tier 1 - (Desktop Fullpage Interstitial) Game Verse
 * Zone ID: 6051238
 * Class: eas6a97888e35
 *
 * Client Hints Meta Tag: Cho phép ad server nhận thông tin thiết bị để tối ưu hóa hiển thị.
 * Zone HTML Tag:
 *   <script async type="application/javascript" src="https://a.pemsrv.com/ad-provider.js"></script>
 *   <ins class="eas6a97888e35" data-zoneid="6051238"></ins>
 *   <script>(AdProvider = window.AdProvider || []).push({"serve": {}});</script>
 *
 * Event: creativeDisplayed-6051238 kích hoạt khi quảng cáo được load và hiển thị.
 */
export const EXOCLICK_ZONE_INTERSTITIAL = "6051238" as const;
export const EXOCLICK_CLASS = "eas6a97888e35" as const;
export const EXOCLICK_PROVIDER_SRC = "https://a.pemsrv.com/ad-provider.js" as const;
export const EXOCLICK_SERVING_DOMAIN = "https://s.pemsrv.com" as const;
export const EXOCLICK_SITE_VERIFICATION = "87c58674c7eabd0e162f44e609b0a49c" as const;

export const EXOCLICK_CLIENT_HINTS =
  "Sec-CH-UA https://s.pemsrv.com; Sec-CH-UA-Mobile https://s.pemsrv.com; Sec-CH-UA-Arch https://s.pemsrv.com; Sec-CH-UA-Model https://s.pemsrv.com; Sec-CH-UA-Platform https://s.pemsrv.com; Sec-CH-UA-Platform-Version https://s.pemsrv.com; Sec-CH-UA-Bitness https://s.pemsrv.com; Sec-CH-UA-Full-Version-List https://s.pemsrv.com; Sec-CH-UA-Full-Version https://s.pemsrv.com;" as const;

export type ExoClickEnvironment = Readonly<Record<string, string | undefined>>;

const DISABLED_VALUES = new Set(["1", "true", "yes", "on"]);

export function exoclickEnabled(env: ExoClickEnvironment = process.env): boolean {
  const disabled = DISABLED_VALUES.has(
    String(env.EXOCLICK_DISABLED ?? "").trim().toLowerCase(),
  );
  if (disabled) return false;
  return (
    env.NEXT_PUBLIC_ADS_ENABLED === "true" ||
    env.NEXT_PUBLIC_EXOCLICK_ENABLED === "true"
  );
}
