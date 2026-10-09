import {
  exoclickEnabled,
  EXOCLICK_CLASS_VIDEO_SLIDER,
  EXOCLICK_PROVIDER_SRC_MAGSRV,
  EXOCLICK_ZONE_VIDEO_SLIDER,
} from "@/lib/exoclick/config";

/**
 * Thẻ Video Slider dành cho ExoClick:
 * - Zone: video slider - (Video Slider) Game Verse
 * - Zone ID: 6051312
 * - Class: eas6a97888e31
 * - Script CDN: https://a.magsrv.com/ad-provider.js
 * - Tự động đẩy lệnh serve và lắng nghe sự kiện creativeDisplayed-6051312.
 */
export function ExoClickVideoSlider() {
  if (!exoclickEnabled()) return null;

  return (
    <div
      id="exoclick-video-slider-container"
      data-zoneid={EXOCLICK_ZONE_VIDEO_SLIDER}
      style={{ display: "contents" }}
      suppressHydrationWarning
    >
      <script
        async
        type="application/javascript"
        src={EXOCLICK_PROVIDER_SRC_MAGSRV}
      />
      <ins
        className={EXOCLICK_CLASS_VIDEO_SLIDER}
        data-zoneid={EXOCLICK_ZONE_VIDEO_SLIDER}
        suppressHydrationWarning
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `(window.AdProvider = window.AdProvider || []).push({"serve": {}});
document.addEventListener('creativeDisplayed-${EXOCLICK_ZONE_VIDEO_SLIDER}', function(event) {
  try {
    console.log('[ExoClick] Video Slider creative displayed: zone ${EXOCLICK_ZONE_VIDEO_SLIDER}', event);
    if (document.body) {
      document.body.setAttribute('data-exoclick-video-slider-displayed', '${EXOCLICK_ZONE_VIDEO_SLIDER}');
      document.body.setAttribute('data-exoclick-creative-displayed-${EXOCLICK_ZONE_VIDEO_SLIDER}', '${EXOCLICK_ZONE_VIDEO_SLIDER}');
    }
  } catch (_) {}
}, false);`,
        }}
      />
    </div>
  );
}
