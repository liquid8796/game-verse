import { describe, expect, it } from "vitest";
import {
  formatLibraryStatus,
  isLibraryStatus,
  libraryStatuses,
} from "./library";

describe("game library domain", () => {
  it("accepts only supported member library states", () => {
    for (const status of libraryStatuses) {
      expect(isLibraryStatus(status)).toBe(true);
    }
    expect(isLibraryStatus("watching")).toBe(false);
  });

  it("formats status labels for UI", () => {
    expect(formatLibraryStatus("playing")).toBe("Playing");
    expect(formatLibraryStatus("wishlist")).toBe("Wishlist");
  });
});
