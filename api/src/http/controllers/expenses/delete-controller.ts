import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

import { NotAuthorizedError } from "@/use-cases/errors/not-authorized-error";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeDeleteExpenseUseCase } from "@/use-cases/factories/make-delete-expense-use-case";

export async function deleteExpense(req: FastifyRequest, reply: FastifyReply) {
  const deleteExpensesSchema = z.object({
    id: z.string(),
  });

  const { id } = deleteExpensesSchema.parse(req.query);

  try {
    const deleteExpensesUseCase = makeDeleteExpenseUseCase();

    await deleteExpensesUseCase.execute({
      id,
      userId: req.user.sub,
    });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    if (err instanceof NotAuthorizedError) {
    }

    throw err;
  }

  return reply.status(201).send();
}
