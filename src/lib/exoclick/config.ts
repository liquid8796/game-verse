/**
 * Cấu hình mạng quảng cáo ExoClick:
 * Zone Desktop Interstitial: Tier 1 - (Desktop Fullpage Interstitial) Game Verse (6051238, eas6a97888e35)
 * Zone Mobile Interstitial: mobile fullpage interstitial - (Mobile Fullpage Interstitial) (6051310, eas6a97888e33)
 * Zone Video Slider: video slider - (Video Slider) Game Verse (6051312, eas6a97888e31, a.magsrv.com)
 * Zone Push Notifications: push notifications - (Push Notifications) Game Verse (6051314, eas6a97888e29, a.magsrv.com, js.wpnsrv.com)
 * Zone Popunder 1: 6051294
 * Zone Popunder 2: 6051308
 *
 * Client Hints Meta Tag: Cho phép ad server nhận thông tin thiết bị để tối ưu hóa hiển thị.
 * Zone HTML Tag:
 *   <script async type="application/javascript" src="https://a.pemsrv.com/ad-provider.js"></script>
 *   <ins class="eas6a97888e35" data-zoneid="6051238"></ins>
 *   <ins class="eas6a97888e33" data-zoneid="6051310"></ins>
 *   <script async type="application/javascript" src="https://a.magsrv.com/ad-provider.js"></script>
 *   <ins class="eas6a97888e31" data-zoneid="6051312"></ins>
 *   <ins class="eas6a97888e29" data-zoneid="6051314"></ins>
 *   <script>(AdProvider = window.AdProvider || []).push({"serve": {}});</script>
 *
 * Events: creativeDisplayed-[zoneId] kích hoạt khi quảng cáo được load và hiển thị.
 */
export const EXOCLICK_ZONE_INTERSTITIAL = "6051238" as const;
export const EXOCLICK_ZONE_INTERSTITIAL_MOBILE = "6051310" as const;
export const EXOCLICK_ZONE_VIDEO_SLIDER = "6051312" as const;
export const EXOCLICK_ZONE_PUSH_NOTIFICATIONS = "6051314" as const;
export const EXOCLICK_ZONE_POPUNDER = "6051294" as const;
export const EXOCLICK_ZONE_POPUNDER_SECONDARY = "6051308" as const;
export const EXOCLICK_CLASS = "eas6a97888e35" as const;
export const EXOCLICK_CLASS_MOBILE = "eas6a97888e33" as const;
export const EXOCLICK_CLASS_VIDEO_SLIDER = "eas6a97888e31" as const;
export const EXOCLICK_CLASS_PUSH_NOTIFICATIONS = "eas6a97888e29" as const;
export const EXOCLICK_PROVIDER_SRC = "https://a.pemsrv.com/ad-provider.js" as const;
export const EXOCLICK_PROVIDER_SRC_MAGSRV = "https://a.magsrv.com/ad-provider.js" as const;
export const EXOCLICK_SERVING_DOMAIN = "https://s.pemsrv.com" as const;
export const EXOCLICK_SERVING_DOMAIN_MAGSRV = "https://s.magsrv.com" as const;
export const EXOCLICK_PUSH_DOMAIN = "https://js.wpnsrv.com" as const;
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
