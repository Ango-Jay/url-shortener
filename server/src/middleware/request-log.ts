import { randomUUID } from "crypto";
import type { Context, Next } from "koa";
import { logger } from "../common/logger";

export async function requestLogMiddleware(
  ctx: Context,
  next: Next,
): Promise<void> {
  const requestId = randomUUID();
  ctx.state.requestId = requestId;
  ctx.set("x-request-id", requestId);

  const start = Date.now();
  try {
    await next();
  } finally {
    logger.info(
      {
        requestId,
        method: ctx.method,
        path: ctx.path,
        status: ctx.status,
        durationMs: Date.now() - start,
      },
      "request",
    );
  }
}
