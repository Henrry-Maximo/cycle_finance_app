import Redis from "ioredis";
import { env } from "@/env";

import { RateLimiterRedis } from "rate-limiter-flexible";

export const redisClient = new Redis({
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
});

export const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "rateLimiter",
  points: 10, // 10 requests
  duration: 60, // per 1 second by IP
});
