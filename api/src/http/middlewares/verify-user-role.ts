import { FastifyReply, FastifyRequest } from "fastify";

export function verifyUserRole(role: "admin" | "member") {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    const { role: userRole } = req.user;

    if (userRole !== role) {
      return reply.status(403).send({ message: "Forbidden." });
    }
  };
}
