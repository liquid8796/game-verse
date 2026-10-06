export interface HealthPayload {
  service: "gameverse";
  status: "ok" | "degraded";
  database: "connected" | "unavailable";
  timestamp: string;
}

export function createHealthPayload(
  databaseConnected: boolean,
  timestamp = new Date().toISOString(),
): HealthPayload {
  return {
    service: "gameverse",
    status: databaseConnected ? "ok" : "degraded",
    database: databaseConnected ? "connected" : "unavailable",
    timestamp,
  };
}
