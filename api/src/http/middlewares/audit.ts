import { FastifyReply, FastifyRequest } from "fastify";

export async function audit(req: FastifyRequest, _: FastifyReply) {
  if (req.user) {
    req.log = req.log.child({
      userId: req.user.sub,
      role: req.user.role,
    });
  }
  
  req.log.info(
    {
      action: "API_REQUEST",
      method: req.method,
      url: req.url,
      ip: req.ip,
    },
    `User ${req.user?.sub ?? "Anonymous"} accessed ${req.url}`,
  );
}
