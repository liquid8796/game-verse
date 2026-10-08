import { fingerprintRequest, saveBusinessInquiry } from "@/features/business-inquiries/repository";
import { validateBusinessInquiry } from "@/features/business-inquiries/validation";
import { getSiteUrl } from "@/lib/site-url";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(getSiteUrl()).origin) {
    return Response.json({ error: "Cross-site submission is not allowed." }, { status: 403 });
  }
  if (!(request.headers.get("content-type") ?? "").includes("application/json")) {
    return Response.json({ error: "Invalid content type." }, { status: 415 });
  }
  if (Number(request.headers.get("content-length") ?? 0) > 12_000) {
    return Response.json({ error: "Request too large." }, { status: 413 });
  }
  let input: unknown;
  try {
    const body = await request.text();
    if (body.length > 12_000) return Response.json({ error: "Request too large." }, { status: 413 });
    input = JSON.parse(body);
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const validation = validateBusinessInquiry(input);
  if (!validation.ok) {
    return Response.json({ error: validation.message }, { status: validation.spam ? 400 : 422 });
  }

  try {
    const ip = request.headers.get("x-real-ip") ??
      (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() ?? "unknown";
    const fingerprint = fingerprintRequest(ip || "unknown", validation.value.email);
    const result = await saveBusinessInquiry(validation.value, fingerprint);
    if (!result.accepted) {
      return Response.json({ error: "Too many enquiries. Please try again later." }, { status: 429 });
    }
    return Response.json({ message: "Enquiry received. Our team can review it now.", reference: result.id }, { status: 201, headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Business enquiry could not be saved:", error instanceof Error ? error.name : "unknown");
    return Response.json({ error: "We couldn't send your enquiry. Please try again later." }, { status: 503 });
  }
}
