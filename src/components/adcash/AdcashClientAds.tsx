"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { adcashEnabled } from "@/lib/adcash/config";

const EXCLUDED_PATH_PREFIXES = ["/api"] as const;

function pathAllowsAds(pathname: string): boolean {
  return !EXCLUDED_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

/**
 * Adcash Client Ads Component.
 * Cung cấp vùng chứa hỗ trợ cho Adcash AutoTag (1zmakzh6c).
 */
export function AdcashClientAds() {
  const pathname = usePathname();
  const allowed = pathAllowsAds(pathname);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!adcashEnabled() || !allowed || !mounted) return null;

  return (
    <div
      id="adcash-ad-container"
      className="adcash-container"
      aria-label="Advertisement"
      data-adcash-zone={process.env.NEXT_PUBLIC_ADCASH_ZONE_ID ?? "1zmakzh6c"}
    />
  );
}
