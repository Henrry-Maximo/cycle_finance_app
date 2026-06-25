import Redis from "ioredis";
import { RateLimiterRedis } from "rate-limiter-flexible";

import { env } from "@/env";

export const redisClient = new Redis({
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
});

export const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "rateLimiter",
  points: 100,
  duration: 60,
});
