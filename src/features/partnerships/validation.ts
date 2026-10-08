export const inquiryTypes = [
  { value: "advertising", label: "Advertising placements" },
  { value: "sponsored", label: "Sponsored campaigns" },
  { value: "collaboration", label: "Content / product collaboration" },
  { value: "other", label: "Something else" },
] as const;

export const budgetRanges = [
  { value: "discuss", label: "Let's discuss" },
  { value: "under-1k", label: "Under $1,000" },
  { value: "1k-5k", label: "$1,000–$5,000" },
  { value: "5k-plus", label: "$5,000+" },
] as const;

export type PartnerInquiry = {
  name: string;
  email: string;
  company: string;
  website: string;
  inquiryType: (typeof inquiryTypes)[number]["value"];
  budget: (typeof budgetRanges)[number]["value"];
  message: string;
  consent: boolean;
  companyFax: string; // Honeypot field. Real visitors should leave this blank.
};

type ValidationResult = { ok: true; value: PartnerInquiry } | { ok: false; error: string };

const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validatePartnerInquiry(input: unknown): ValidationResult {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { ok: false, error: "Please complete the enquiry form." };
  }
  const value = input as Record<string, unknown>;
  const field = (name: keyof PartnerInquiry) =>
    typeof value[name] === "string" ? (value[name] as string).trim() : "";
  const name = field("name");
  const email = field("email").toLowerCase();
  const company = field("company");
  const website = field("website");
  const inquiryType = field("inquiryType");
  const budget = field("budget");
  const message = field("message");
  const companyFax = field("companyFax");

  if (companyFax) return { ok: false, error: "Your request could not be submitted." };
  if (name.length < 2 || name.length > 100) return { ok: false, error: "Enter your name (2–100 characters)." };
  if (email.length > 254 || !validEmail.test(email)) return { ok: false, error: "Enter a valid work email." };
  if (company.length < 2 || company.length > 120) return { ok: false, error: "Enter an organisation or brand name." };
  if (website.length > 240) return { ok: false, error: "Website URL is too long." };
  if (website) {
    try {
      const parsed = new URL(website);
      if (!["https:", "http:"].includes(parsed.protocol) || !parsed.hostname.includes(".")) {
        return { ok: false, error: "Enter a valid website URL beginning with https://." };
      }
    } catch { return { ok: false, error: "Enter a valid website URL beginning with https://." }; }
  }
  if (!inquiryTypes.some((item) => item.value === inquiryType)) {
    return { ok: false, error: "Choose a collaboration type." };
  }
  if (!budgetRanges.some((item) => item.value === budget)) {
    return { ok: false, error: "Choose a budget range." };
  }
  if (message.length < 30 || message.length > 4000) {
    return { ok: false, error: "Tell us about the opportunity in 30–4,000 characters." };
  }
  if (value.consent !== true) {
    return { ok: false, error: "Please agree to being contacted about this enquiry." };
  }

  return { ok: true, value: { name, email, company, website, inquiryType: inquiryType as PartnerInquiry["inquiryType"], budget: budget as PartnerInquiry["budget"], message, companyFax: "", consent: true } };
}

