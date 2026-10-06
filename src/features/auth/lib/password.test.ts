import { describe, expect, it } from "vitest";
import { hashPassword, verifyPassword } from "./password";

describe("password hashing", () => {
  it("verifies the original password and rejects a different password", () => {
    const hash = hashPassword("gameverse-passphrase");
    expect(hash).not.toContain("gameverse-passphrase");
    expect(verifyPassword("gameverse-passphrase", hash)).toBe(true);
    expect(verifyPassword("wrong-passphrase", hash)).toBe(false);
  });

  it("rejects malformed hashes", () => {
    expect(verifyPassword("anything", "not-a-password-hash")).toBe(false);
  });
});
