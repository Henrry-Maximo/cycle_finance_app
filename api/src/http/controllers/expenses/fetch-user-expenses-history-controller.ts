import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeFetchExpensesUseCase } from "@/use-cases/factories/make-fetch-expenses-use-case";

export async function fetchExpenses(req: FastifyRequest, reply: FastifyReply) {
  const searchExpensesQuerySchema = z.object({
    expense: z.string().optional(),
    category: z.string().optional(),
    from: z
      .string()
      .optional()
      .transform((val) => (val ? new Date(val) : undefined)),
    to: z
      .string()
      .optional()
      .transform((val) => (val ? new Date(val) : undefined)),
    page: z.coerce.number().default(1),
  });

  const { expense, category, from, to, page } = searchExpensesQuerySchema.parse(
    req.query,
  );

  try {
    const fetchExpensesUseCase = makeFetchExpensesUseCase();

    const { expenses, meta } = await fetchExpensesUseCase.execute({
      userId: req.user.sub,
      pageIndex: page,
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
