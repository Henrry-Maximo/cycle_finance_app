import { FastifyReply, FastifyRequest } from "fastify";

import { env } from "@/env";

export async function verifyJWT(req: FastifyRequest, reply: FastifyReply) {
  try {
    await req.jwtVerify();
  } catch (err) {
    if (env.NODE_ENV === "dev") {
      console.error(err);
    }

    return reply.status(401).send({ message: "Unauthorized." });
  }
}
