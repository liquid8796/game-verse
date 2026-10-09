import {
  exoclickEnabled,
  EXOCLICK_CLASS_PUSH_NOTIFICATIONS,
  EXOCLICK_PROVIDER_SRC_MAGSRV,
  EXOCLICK_ZONE_PUSH_NOTIFICATIONS,
} from "@/lib/exoclick/config";

/**
 * Thẻ Push Notifications dành cho ExoClick:
 * - Zone: push notifications - (Push Notifications) Game Verse
 * - Zone ID: 6051314
 * - Class: eas6a97888e29
 * - Service Worker: /worker.js (nạp kịch bản https://js.wpnsrv.com/worker.php?v=2.0)
 * - Script CDN: https://a.magsrv.com/ad-provider.js
 * - Tự động đẩy lệnh serve và lắng nghe sự kiện creativeDisplayed-6051314.
 */
export function ExoClickPushNotifications() {
  if (!exoclickEnabled()) return null;

  return (
    <div
      id="exoclick-push-notifications-container"
      data-zoneid={EXOCLICK_ZONE_PUSH_NOTIFICATIONS}
      style={{ display: "contents" }}
      suppressHydrationWarning
    >
      <script
        async
        type="application/javascript"
        src={EXOCLICK_PROVIDER_SRC_MAGSRV}
      />
      <ins
        className={EXOCLICK_CLASS_PUSH_NOTIFICATIONS}
        data-zoneid={EXOCLICK_ZONE_PUSH_NOTIFICATIONS}
        suppressHydrationWarning
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `(window.AdProvider = window.AdProvider || []).push({"serve": {}});
document.addEventListener('creativeDisplayed-${EXOCLICK_ZONE_PUSH_NOTIFICATIONS}', function(event) {
  try {
    console.log('[ExoClick] Push Notifications creative displayed: zone ${EXOCLICK_ZONE_PUSH_NOTIFICATIONS}', event);
    if (document.body) {
      document.body.setAttribute('data-exoclick-push-displayed', '${EXOCLICK_ZONE_PUSH_NOTIFICATIONS}');
      document.body.setAttribute('data-exoclick-creative-displayed-${EXOCLICK_ZONE_PUSH_NOTIFICATIONS}', '${EXOCLICK_ZONE_PUSH_NOTIFICATIONS}');
    }
  } catch (_) {}
}, false);`,
        }}
      />
    </div>
  );
}
