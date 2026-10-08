import { describe, expect, it } from "vitest";
import { validateBusinessInquiry } from "./validation";

const valid = {
  name: "Jordan Smith",
  company: "Studio North",
  email: "Jordan@North.Example",
  website: "https://north.example",
  kind: "display",
  budget: "1k-5k",
  message: "We would like to discuss a launch advertising campaign for our new game.",
  companyFax: "",
  consent: true,
};

describe("business enquiry input", () => {
  it("validates and normalises an enquiry", () => {
    const result = validateBusinessInquiry(valid);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value.email).toBe("jordan@north.example");
  });
  it("rejects missing consent and invalid urls", () => {
    expect(validateBusinessInquiry({ ...valid, consent: false }).ok).toBe(false);
    expect(validateBusinessInquiry({ ...valid, website: "javascript:alert(1)" }).ok).toBe(false);
  });
  it("rejects spam, unsupported types, and insufficient detail", () => {
    expect(validateBusinessInquiry({ ...valid, companyFax: "bot" }).ok).toBe(false);
    expect(validateBusinessInquiry({ ...valid, kind: "unknown" }).ok).toBe(false);
    expect(validateBusinessInquiry({ ...valid, message: "hello" }).ok).toBe(false);
  });
  it("rejects malformed bodies", () => {
    expect(validateBusinessInquiry(null).ok).toBe(false);
    expect(validateBusinessInquiry([]).ok).toBe(false);
    expect(validateBusinessInquiry({}).ok).toBe(false);
  });
});
