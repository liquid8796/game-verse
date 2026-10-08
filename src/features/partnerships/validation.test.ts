import { describe, expect, it } from "vitest";
import { validatePartnerInquiry } from "./validation";
const good = { name: "Alex Morgan", email: "Alex@Studio.Example", company: "Studio Pixel", website: "https://studio.example", inquiryType: "advertising", budget: "1k-5k", message: "We would like to discuss contextual ads for upcoming game launches.", companyFax: "", consent: true };
describe("partner inquiry validation", () => {
  it("accepts a complete enquiry and normalises email", () => {
    const result = validatePartnerInquiry(good);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value.email).toBe("alex@studio.example");
  });
  it("rejects automated honeypot submissions", () => {
    expect(validatePartnerInquiry({ ...good, companyFax: "bot" }).ok).toBe(false);
  });
  it("rejects malformed emails", () => {
    expect(validatePartnerInquiry({ ...good, email: "not-an-email" }).ok).toBe(false);
  });
  it("rejects unsupported inquiry types", () => {
    expect(validatePartnerInquiry({ ...good, inquiryType: "random" }).ok).toBe(false);
  });
  it("rejects unsuitable website schemes", () => {
    expect(validatePartnerInquiry({ ...good, website: "javascript:alert(1)" }).ok).toBe(false);
  });
  it("rejects overly short messages and missing consent", () => {
    expect(validatePartnerInquiry({ ...good, message: "Hi" }).ok).toBe(false);
    expect(validatePartnerInquiry({ ...good, consent: false }).ok).toBe(false);
  });
  it("does not accept arbitrary payloads", () => {
    expect(validatePartnerInquiry(null).ok).toBe(false);
    expect(validatePartnerInquiry([]).ok).toBe(false);
  });
});

