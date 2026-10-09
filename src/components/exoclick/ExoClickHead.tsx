import {
  exoclickEnabled,
  EXOCLICK_CLIENT_HINTS,
} from "@/lib/exoclick/config";

/**
 * Thẻ Head dành cho mạng quảng cáo ExoClick:
 * 1. Preconnect tới CDN phân phối kịch bản (a.pemsrv.com) và máy chủ quảng cáo (s.pemsrv.com).
 * 2. Thẻ Client Hints (Delegate-CH) hỗ trợ phân tích thiết bị và tối ưu hóa CPM/targeting.
 */
export function ExoClickHead() {
  if (!exoclickEnabled()) return null;

  return (
    <>
      <link rel="preconnect" href="https://a.pemsrv.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://s.pemsrv.com" crossOrigin="anonymous" />
      <meta
        httpEquiv="Delegate-CH"
        content={EXOCLICK_CLIENT_HINTS}
      />
    </>
  );
}
