import type { Context, Next } from "koa";
import { TooManyRequestsError } from "../common/error";
import type { RedisClient } from "../config/redis";

const LIMIT = 10;
const WINDOW_SECONDS = 60;

export function createRateLimitMiddleware(redis: RedisClient) {
  return async function rateLimit(ctx: Context, next: Next): Promise<void> {
    // TODO: if we sit behind a proxy, set app.proxy and trust X-Forwarded-For
    const key = `rl:aliases:${ctx.ip}`;
    const count = await redis.incr(key);

    if (count === 1) {
      await redis.expire(key, WINDOW_SECONDS);
    }

    const remaining = Math.max(0, LIMIT - count);
    ctx.set("RateLimit-Limit", String(LIMIT));
    ctx.set("RateLimit-Remaining", String(remaining));

    if (count > LIMIT) {
      const ttl = await redis.ttl(key);
      ctx.set("Retry-After", String(ttl > 0 ? ttl : WINDOW_SECONDS));
      throw new TooManyRequestsError();
    }

    await next();
  };
}
