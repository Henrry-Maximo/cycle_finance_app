import { FastifyReply, FastifyRequest } from "fastify";

export async function getUsers(req: FastifyRequest, reply: FastifyReply) {
  // const searchUsersSchema = z.object({
  //   name: z.string().optional(),
  // });

  // const { name } = searchUsersSchema.parse(req.query);

  // return reply.status(200).send({ users });
}