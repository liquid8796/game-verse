import {
  adcashEnabled,
  ADCASH_AUTOTAG_ZONE_ID,
  ADCASH_LIB_SRC,
} from "@/lib/adcash/config";
import { AdcashClientAds } from "@/components/adcash/AdcashClientAds";

/**
 * Adcash Head Scripts.
 * Nhúng duy nhất Step 1 thư viện aclib và Step 2 AutoTag (7gpx1rimky) trong <head>.
 * Crawler Adcash sẽ thấy ngay lập tức mã xác thực này trong phản hồi SSR của trang.
 */
export function AdcashHead() {
  if (!adcashEnabled()) return null;

  return (
    <>
      <script id="aclib" type="text/javascript" src={ADCASH_LIB_SRC} />
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `aclib.runAutoTag({
    zoneId: '${ADCASH_AUTOTAG_ZONE_ID}',
});`,
        }}
      />
    </>
  );
}

/**
 * Quản lý quảng cáo Adcash phía Body.
 * Duy trì vùng chứa cho AutoTag.
 */
export function AdcashAds() {
  if (!adcashEnabled()) return null;

  return <AdcashClientAds />;
}
