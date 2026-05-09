import { makeGetExpensesUseCase } from "@/use-cases/factories/make-get-expenses-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { Prisma } from "generated/prisma/client";
import z from "zod";

export async function getExpenses(req: FastifyRequest, reply: FastifyReply) {
  const searchUsersSchema = z.object({
    contains: z.string().optional().nullable(),
    mode: z.string().optional().nullable(),
  });

  const { contains, mode } = searchUsersSchema.parse(req.query);

  try {
    const getExpensesUseCase = makeGetExpensesUseCase();
    const { expenses } = await getExpensesUseCase.execute({
      contains: contains ?? "", mode: mode as Prisma.QueryMode
    });

    return reply.status(200).send({ expenses });
  } catch (err) {
    throw err;
  }
}  