import { createClient } from "redis";
import { config } from "./index";

export async function initializeRedis() {
  const client = createClient({ url: config.redisUrl });
  await client.connect();
  return client;
}

export type RedisClient = Awaited<ReturnType<typeof initializeRedis>>;
