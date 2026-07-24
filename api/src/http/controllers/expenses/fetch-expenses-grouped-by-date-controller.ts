import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeFetchExpensesGroupedByDateUseCase } from "@/use-cases/factories/make-fetch-expenses-grouped-by-date-use-case";

export async function fetchExpensesGroupedByDate(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const expensesQuerySchema = z.object({
    from: z
      .string()
      .optional()
      .transform((val) => (val ? new Date(val) : undefined)),
    to: z
      .string()
      .optional()
      .transform((val) => (val ? new Date(val) : undefined)),
  });

  const { from, to } = expensesQuerySchema.parse(req.query);

  try {
    const fetchExpensesGroupedByDateUseCase =
      makeFetchExpensesGroupedByDateUseCase();

    const { expenses } = await fetchExpensesGroupedByDateUseCase.execute({
      userId: req.user.sub,
      ...(from && { from }),
      ...(to && { to }),
    });

    return reply.status(200).send({ expenses });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }
}
