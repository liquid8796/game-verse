export const inquiryKinds = [
  { value: "display", label: "Display advertising" },
  { value: "sponsored", label: "Sponsored campaign" },
  { value: "product", label: "Product collaboration" },
  { value: "other", label: "Other opportunity" },
] as const;

export const budgetOptions = [
  { value: "not-set", label: "Let's discuss" },
  { value: "under-1k", label: "Under $1,000" },
  { value: "1k-5k", label: "$1,000–$5,000" },
  { value: "5k-20k", label: "$5,000–$20,000" },
  { value: "20k-plus", label: "$20,000+" },
] as const;

export type BusinessInquiry = {
  name: string;
  email: string;
  company: string;
  website: string;
  kind: (typeof inquiryKinds)[number]["value"];
  budget: (typeof budgetOptions)[number]["value"];
  message: string;
};

export type InquiryValidation =
  | { ok: true; value: BusinessInquiry }
  | { ok: false; message: string; spam?: boolean };

export function validateBusinessInquiry(input: unknown): InquiryValidation {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { ok: false, message: "Please complete the enquiry form." };
  }
  const obj = input as Record<string, unknown>;
  const field = (key: string) =>
    typeof obj[key] === "string" ? (obj[key] as string).trim() : "";
  const name = field("name");
  const company = field("company");
  const email = field("email").toLowerCase();
  const website = field("website");
  const kind = field("kind");
  const budget = field("budget");
  const message = field("message");
  if (field("companyFax")) return { ok: false, spam: true, message: "Unable to send your enquiry." };
  if (name.length < 2 || name.length > 100) return { ok: false, message: "Enter your name (2–100 characters)." };
  if (company.length < 2 || company.length > 120) return { ok: false, message: "Enter your company or brand name." };
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, message: "Enter a valid email address." };
  if (website.length > 240) return { ok: false, message: "Website URL is too long." };
  if (website) {
    try {
      const url = new URL(website);
      if (!["http:", "https:"].includes(url.protocol) || !url.hostname.includes(".")) {
        return { ok: false, message: "Enter a valid website URL beginning with https://." };
      }
    } catch {
      return { ok: false, message: "Enter a valid website URL beginning with https://." };
    }
  }
  if (!inquiryKinds.some((item) => item.value === kind)) return { ok: false, message: "Choose an enquiry type." };
  if (!budgetOptions.some((item) => item.value === budget)) return { ok: false, message: "Choose a budget range." };
  if (message.length < 30 || message.length > 4000) return { ok: false, message: "Message must be 30–4,000 characters." };
  if (obj.consent !== true) return { ok: false, message: "Please consent to being contacted about your enquiry." };

  return {
    ok: true,
    value: { name, company, email, website, kind: kind as BusinessInquiry["kind"], budget: budget as BusinessInquiry["budget"], message },
  };
}
