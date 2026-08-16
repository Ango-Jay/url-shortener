import type { HealthStatus } from "./model";

export function getHealthStatus(): HealthStatus {
  return {
    status: "ok",
    checkedAt: new Date().toISOString(),
  };
}
