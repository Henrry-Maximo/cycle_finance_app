import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeFetchExpensesUseCase } from "@/use-cases/factories/make-fetch-expenses-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { Prisma } from "generated/prisma/client";
import z from "zod";

export async function fetchUserExpensesHistory(req: FastifyRequest, reply: FastifyReply) {
  const searchUsersSchema = z.object({
    id: z.string(),
    contains: z.string().optional().nullable(),
    mode: z.string().optional().nullable(),
  });

  const { id, contains, mode } = searchUsersSchema.parse(req.query);

  try {
    const fetchExpensesUseCase = makeFetchExpensesUseCase();
    const { expenses } = await fetchExpensesUseCase.execute({
      userId: id,
      contains: contains ?? "",
      mode: mode as Prisma.QueryMode
    });

    return reply.status(200).send({ expenses });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }
}  