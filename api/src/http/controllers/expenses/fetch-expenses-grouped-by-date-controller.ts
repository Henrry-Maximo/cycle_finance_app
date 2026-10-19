import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeFetchExpensesGroupedByDateUseCase } from "@/use-cases/factories/make-fetch-expenses-grouped-by-date-use-case";
import { getExpensePeriodQuerySchema } from "./schemas/get-expense-period.schema";

export async function fetchExpensesGroupedByDate(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const { from, to } = getExpensePeriodQuerySchema.parse(req.query);

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
