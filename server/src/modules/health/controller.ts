import type { Context } from "koa";
import { getHealthStatus } from "./service";

export async function getHealth(ctx: Context): Promise<void> {
  const health = getHealthStatus();

  ctx.status = 200;
  ctx.body = { status: health.status };
}
