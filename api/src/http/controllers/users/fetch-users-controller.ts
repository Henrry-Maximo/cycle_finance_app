import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

import { makeGetUsersUseCase } from "@/use-cases/factories/make-get-users-use-case";

export async function fetchUsers(req: FastifyRequest, reply: FastifyReply) {
  const searchUsersSchema = z.object({
    query: z.string().optional().nullable(),
    page: z.coerce.number().default(1),
  });

  const { query, page } = searchUsersSchema.parse(req.query);

  const getUsersUseCase = makeGetUsersUseCase();

  const { users, meta } = await getUsersUseCase.execute({
    userName: query ?? "",
    pageIndex: page,
  });

  return reply.status(200).send({ users, meta });
}
