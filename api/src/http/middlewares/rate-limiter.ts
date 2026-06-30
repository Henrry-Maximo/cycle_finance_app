import { FastifyReply, FastifyRequest } from "fastify";

import { limiter } from "@/lib/redis";

export async function rateLimiter(req: FastifyRequest, reply: FastifyReply) {
  try {
    await limiter.consume(req.ip);
  } catch (err) {
    // req.log.error(err);
    // return reply.status(500).send({
    //   message: "Internal Server Error",
    // });

    throw err;
  }
}
