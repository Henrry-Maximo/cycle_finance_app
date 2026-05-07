import { makeGetUsersUseCase } from "@/use-cases/factories/make-get-users-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function getUsers(req: FastifyRequest, reply: FastifyReply) {
  const searchUsersSchema = z.object({
    name: z.string().nullable().optional().default(""),
  });

  const { name } = searchUsersSchema.parse(req.query);

  try {
    const getUsersUseCase = makeGetUsersUseCase();

    const { users } = await getUsersUseCase.execute({ name });

    return reply.status(200).send({ users });
  } catch (err) {
    throw err;
  }
}