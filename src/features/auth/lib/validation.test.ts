import { describe, expect, it } from "vitest";
import {
  normalizeEmail,
  normalizeUsername,
  validateDisplayName,
  validateEmail,
  validatePassword,
  validateUsername,
} from "./validation";

describe("account validation", () => {
  it("normalizes account identifiers", () => {
    expect(normalizeEmail("  Player@Example.COM ")).toBe("player@example.com");
    expect(normalizeUsername("  Night_Runner ")).toBe("night_runner");
  });

  it("validates signup fields", () => {
    expect(validateEmail("player@example.com")).toBe(true);
    expect(validateEmail("not-an-email")).toBe(false);
    expect(validateUsername("night_runner")).toBe(true);
    expect(validateUsername("No Spaces")).toBe(false);
    expect(validatePassword("1234567890")).toBe(true);
    expect(validatePassword("short")).toBe(false);
    expect(validateDisplayName("V")).toBe(false);
    expect(validateDisplayName("Vice City Runner")).toBe(true);
  });
});
