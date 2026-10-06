import { describe, expect, it } from "vitest";
import { createHealthPayload } from "./health-state";

describe("createHealthPayload", () => {
  it("reports a healthy database without exposing implementation details", () => {
    expect(createHealthPayload(true, "2026-10-06T02:00:00.000Z")).toEqual({
      service: "gameverse",
      status: "ok",
      database: "connected",
      timestamp: "2026-10-06T02:00:00.000Z",
    });
  });

  it("reports degraded state when the database is unavailable", () => {
    expect(createHealthPayload(false, "2026-10-06T02:00:00.000Z")).toEqual({
      service: "gameverse",
      status: "degraded",
      database: "unavailable",
      timestamp: "2026-10-06T02:00:00.000Z",
    });
  });
});
