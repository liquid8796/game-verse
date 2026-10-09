import {
  exoclickEnabled,
  EXOCLICK_CLASS_IN_PAGE_PUSH,
  EXOCLICK_PROVIDER_SRC_MAGSRV,
  EXOCLICK_ZONE_IN_PAGE_PUSH,
} from "@/lib/exoclick/config";

/**
 * Thẻ In-Page Push Notifications dành cho ExoClick:
 * - Zone: in page push notifications - (In Page Push Notifications) Game Verse
 * - Zone ID: 6051316
 * - Class: eas6a97888e42
 * - Script CDN: https://a.magsrv.com/ad-provider.js
 * - Tự động đẩy lệnh serve và lắng nghe sự kiện creativeDisplayed-6051316.
 */
export function ExoClickInPagePush() {
  if (!exoclickEnabled()) return null;

  return (
    <div
      id="exoclick-in-page-push-container"
      data-zoneid={EXOCLICK_ZONE_IN_PAGE_PUSH}
      style={{ display: "contents" }}
      suppressHydrationWarning
    >
      <script
        async
        type="application/javascript"
        src={EXOCLICK_PROVIDER_SRC_MAGSRV}
      />
      <ins
        className={EXOCLICK_CLASS_IN_PAGE_PUSH}
        data-zoneid={EXOCLICK_ZONE_IN_PAGE_PUSH}
        suppressHydrationWarning
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `(window.AdProvider = window.AdProvider || []).push({"serve": {}});
document.addEventListener('creativeDisplayed-${EXOCLICK_ZONE_IN_PAGE_PUSH}', function(event) {
  try {
    console.log('[ExoClick] In-Page Push creative displayed: zone ${EXOCLICK_ZONE_IN_PAGE_PUSH}', event);
    if (document.body) {
      document.body.setAttribute('data-exoclick-in-page-push-displayed', '${EXOCLICK_ZONE_IN_PAGE_PUSH}');
      document.body.setAttribute('data-exoclick-creative-displayed-${EXOCLICK_ZONE_IN_PAGE_PUSH}', '${EXOCLICK_ZONE_IN_PAGE_PUSH}');
    }
  } catch (_) {}
}, false);`,
        }}
      />
    </div>
  );
}
