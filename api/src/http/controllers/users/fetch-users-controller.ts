import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

import { makeGetUsersUseCase } from "@/use-cases/factories/make-get-users-use-case";

export async function fetchUsers(req: FastifyRequest, reply: FastifyReply) {
  const searchUsersSchema = z.object({
    query: z.string().nullable().default(""),
  });

  const { query } = searchUsersSchema.parse(req.query);

  try {
    const getUsersUseCase = makeGetUsersUseCase();

    const { users } = await getUsersUseCase.execute({ query });

    return reply.status(200).send({ users });
  } catch (err) {
    throw err;
  }
}
