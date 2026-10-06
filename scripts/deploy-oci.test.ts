import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const script = readFileSync(
  join(process.cwd(), "scripts/deploy-oci.ps1"),
  "utf8",
);

describe("OCI deployment ordering", () => {
  it("builds a staging release before stopping and replacing the live release", () => {
    const stagingIndex = script.indexOf('STAGING="$APP_ROOT/staging"');
    const buildIndex = script.indexOf("npm run build");
    const stopIndex = script.indexOf("systemctl stop gameverse.service");
    const removeCurrentIndex = script.indexOf('rm -rf "$CURRENT"');
    const promoteIndex = script.indexOf('mv "$STAGING" "$CURRENT"');

    expect(stagingIndex).toBeGreaterThan(-1);
    expect(buildIndex).toBeGreaterThan(stagingIndex);
    expect(stopIndex).toBeGreaterThan(buildIndex);
    expect(removeCurrentIndex).toBeGreaterThan(stopIndex);
    expect(promoteIndex).toBeGreaterThan(removeCurrentIndex);
  });

  it("checks the protected shared environment file with elevated access", () => {
    expect(script).toContain('if ! sudo test -f "$SHARED/.env"; then');
  });

  it("uses the production domain and updates canonical site url without rotating credentials", () => {
    expect(script).toContain('[string]$SiteUrl = "https://gameverse.online"');
    expect(script).toContain(
      'sudo sed -i "s#^NEXT_PUBLIC_SITE_URL=.*#NEXT_PUBLIC_SITE_URL=$SITE_URL#" "$SHARED/.env"',
    );
    expect(script).toContain("NEXT_PUBLIC_ADS_ENABLED=true");
  });
});
