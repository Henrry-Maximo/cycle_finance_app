import { FastifyReply, FastifyRequest } from "fastify";

import { makeGetUsersUseCase } from "@/use-cases/factories/make-get-users-use-case";
import { getUsersQuerySchema } from "./schemas/get-users.schema";

export async function fetchUsers(req: FastifyRequest, reply: FastifyReply) {
  const { query, page } = getUsersQuerySchema.parse(req.query);

  const getUsersUseCase = makeGetUsersUseCase();

  const { users, meta } = await getUsersUseCase.execute({
    userName: query ?? "",
    pageIndex: page,
  });

  return reply.status(200).send({ users, meta });
}
