import { describe, expect, it } from "vitest";
import { isValidRating, validateReview } from "./review";

describe("ratings and reviews", () => {
  it("accepts only integer ratings from 1 through 10", () => {
    expect(isValidRating(1)).toBe(true);
    expect(isValidRating(10)).toBe(true);
    expect(isValidRating(0)).toBe(false);
    expect(isValidRating(11)).toBe(false);
    expect(isValidRating(8.5)).toBe(false);
  });

  it("validates public review copy", () => {
    expect(validateReview("Great systems", "A".repeat(80))).toBeUndefined();
    expect(validateReview("No", "A".repeat(80))).toMatch(/Headline/);
    expect(validateReview("Good game", "Too short")).toMatch(/Review/);
  });
});
