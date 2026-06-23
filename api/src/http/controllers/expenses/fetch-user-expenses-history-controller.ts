import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeFetchExpensesUseCase } from "@/use-cases/factories/make-fetch-expenses-use-case";

export async function fetchExpenses(req: FastifyRequest, reply: FastifyReply) {
  const searchExpensesSchema = z.object({
    query: z.string().optional().nullable(),
    page: z.coerce.number().default(1),
  });

  const { query, page } = searchExpensesSchema.parse(req.query);

  try {
    const fetchExpensesUseCase = makeFetchExpensesUseCase();

    const { expenses, meta } = await fetchExpensesUseCase.execute({
      userId: req.user.sub,
      expenseName: query ?? "",
      pageIndex: page,
    });

    return reply.status(200).send({ expenses, meta });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }
}
