import { pingDatabase } from "@/server/db/client";
import { createHealthPayload } from "@/server/health/health-state";

export const runtime = "nodejs";

export async function GET() {
  try {
    await pingDatabase();
    return Response.json(createHealthPayload(true), { status: 200 });
  } catch {
    return Response.json(createHealthPayload(false), { status: 503 });
  }
}
