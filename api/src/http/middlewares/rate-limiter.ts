import { FastifyReply, FastifyRequest } from "fastify";
import { limiter } from "@/lib/redis";
import { RateLimiterRes } from "rate-limiter-flexible";

export async function rateLimiter(req: FastifyRequest, reply: FastifyReply) {
  try {
    await limiter.consume(req.ip);
  } catch (err) {
    if (err instanceof RateLimiterRes) {
      return reply.status(429).send({
        message: "Too Many Requests",
      });
    }

    // req.log.error(err);
    // return reply.status(500).send({
    //   message: "Internal Server Error",
    // });
  }
}
