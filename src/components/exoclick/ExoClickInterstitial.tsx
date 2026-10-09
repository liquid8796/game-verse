import {
  exoclickEnabled,
  EXOCLICK_CLASS,
  EXOCLICK_CLASS_MOBILE,
  EXOCLICK_PROVIDER_SRC,
  EXOCLICK_ZONE_INTERSTITIAL,
  EXOCLICK_ZONE_INTERSTITIAL_MOBILE,
} from "@/lib/exoclick/config";

/**
 * Thẻ Interstitial dành cho ExoClick:
 * - Desktop Zone: 6051238 (eas6a97888e35)
 * - Mobile Zone: 6051310 (eas6a97888e33)
 * - Tự động đẩy lệnh serve và lắng nghe sự kiện creativeDisplayed.
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
      {/* Desktop Fullpage Interstitial */}
      <ins
        id="exoclick-interstitial-desktop"
        className={EXOCLICK_CLASS}
        data-zoneid={EXOCLICK_ZONE_INTERSTITIAL}
        suppressHydrationWarning
      />
      {/* Mobile Fullpage Interstitial */}
      <ins
        id="exoclick-interstitial-mobile"
        className={EXOCLICK_CLASS_MOBILE}
        data-zoneid={EXOCLICK_ZONE_INTERSTITIAL_MOBILE}
        suppressHydrationWarning
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `(window.AdProvider = window.AdProvider || []).push({"serve": {}});
(window.AdProvider = window.AdProvider || []).push({"serve": {}});
document.addEventListener('creativeDisplayed-${EXOCLICK_ZONE_INTERSTITIAL}', function(event) {
  try {
    console.log('[ExoClick] Desktop Interstitial creative displayed: zone ${EXOCLICK_ZONE_INTERSTITIAL}', event);
    if (document.body) {
      document.body.setAttribute('data-exoclick-creative-displayed', '${EXOCLICK_ZONE_INTERSTITIAL}');
      document.body.setAttribute('data-exoclick-creative-displayed-${EXOCLICK_ZONE_INTERSTITIAL}', '${EXOCLICK_ZONE_INTERSTITIAL}');
    }
  } catch (_) {}
}, false);
document.addEventListener('creativeDisplayed-${EXOCLICK_ZONE_INTERSTITIAL_MOBILE}', function(event) {
  try {
    console.log('[ExoClick] Mobile Interstitial creative displayed: zone ${EXOCLICK_ZONE_INTERSTITIAL_MOBILE}', event);
    if (document.body) {
      document.body.setAttribute('data-exoclick-creative-displayed', '${EXOCLICK_ZONE_INTERSTITIAL_MOBILE}');
      document.body.setAttribute('data-exoclick-creative-displayed-${EXOCLICK_ZONE_INTERSTITIAL_MOBILE}', '${EXOCLICK_ZONE_INTERSTITIAL_MOBILE}');
    }
  } catch (_) {}
}, false);`,
        }}
      />
    </div>
  );
}
