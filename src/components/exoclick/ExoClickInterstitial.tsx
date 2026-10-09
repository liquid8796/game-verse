import {
  exoclickEnabled,
  EXOCLICK_CLASS,
  EXOCLICK_PROVIDER_SRC,
  EXOCLICK_ZONE_INTERSTITIAL,
} from "@/lib/exoclick/config";

/**
 * Thẻ Interstitial dành cho ExoClick:
 * - Zone: Tier 1 - (Desktop Fullpage Interstitial) Game Verse
 * - Zone ID: 6051238
 * - Tự động đẩy lệnh serve và lắng nghe sự kiện creativeDisplayed-6051238.
 */
export function ExoClickInterstitial() {
  if (!exoclickEnabled()) return null;

  return (
    <div
      id="exoclick-interstitial-container"
      data-zoneid={EXOCLICK_ZONE_INTERSTITIAL}
      style={{ display: "contents" }}
      suppressHydrationWarning
    >
      <script
        async
        type="application/javascript"
        src={EXOCLICK_PROVIDER_SRC}
      />
      <ins
        className={EXOCLICK_CLASS}
        data-zoneid={EXOCLICK_ZONE_INTERSTITIAL}
        suppressHydrationWarning
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `(window.AdProvider = window.AdProvider || []).push({"serve": {}});
document.addEventListener('creativeDisplayed-${EXOCLICK_ZONE_INTERSTITIAL}', function(event) {
  try {
    console.log('[ExoClick] Interstitial creative displayed: zone ${EXOCLICK_ZONE_INTERSTITIAL}', event);
    if (document.body) {
      document.body.setAttribute('data-exoclick-creative-displayed', '${EXOCLICK_ZONE_INTERSTITIAL}');
    }
  } catch (_) {}
}, false);`,
        }}
      />
    </div>
  );
}
