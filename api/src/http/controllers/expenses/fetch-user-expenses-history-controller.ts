import { FastifyReply, FastifyRequest } from "fastify";

import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeFetchExpensesUseCase } from "@/use-cases/factories/make-fetch-expenses-use-case";
import { getExpenseQuerySchema } from "./schemas/get-expense.schema";

export async function fetchExpenses(req: FastifyRequest, reply: FastifyReply) {
  const { expense, category, from, to, pageIndex } =
    getExpenseQuerySchema.parse(req.query);

  try {
    const fetchExpensesUseCase = makeFetchExpensesUseCase();

    const { expenses, meta } = await fetchExpensesUseCase.execute({
      userId: req.user.sub,
      pageIndex,
      ...(expense && { expenseName: expense }),
      ...(category && { categoryName: category }),
      ...(from && { from }),
      ...(to && { to }),
    });

    return reply.status(200).send({ expenses, meta });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }
}
