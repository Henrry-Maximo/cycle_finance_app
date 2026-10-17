import { FastifyReply, FastifyRequest } from "fastify";

import { CategoryAlreadyInUseError } from "@/use-cases/errors/category-already-in-use-error";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { MakeUpdateExpensesUseCase } from "@/use-cases/factories/make-update-expenses-use-case";
import {
  patchExpenseBodySchema,
  updateExpensesQuerySchema,
} from "./schemas/patch-expense.schema";

export async function update(req: FastifyRequest, reply: FastifyReply) {
  const { id } = updateExpensesQuerySchema.parse(req.query);

  const {
    title,
    description,
    enterprise,
    cnpj,
    price,
    source,
    card_last_digits,
    category_id,
  } = patchExpenseBodySchema.parse(req.body);

  try {
    const updateExpensesUseCase = MakeUpdateExpensesUseCase();

    const { expense } = await updateExpensesUseCase.execute({
      userId: req.user.sub,
      expenseId: id,
      ...(title && { title }),
      ...(description && { description }),
      ...(enterprise && { enterprise }),
      ...(cnpj != null && { cnpj }),
      ...(price != null && { price }),
      ...(source && { source }),
      ...(card_last_digits && { card_last_digits }),
      ...(category_id && { category_id }),
    });

    return reply.status(200).send(expense);
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    if (err instanceof CategoryAlreadyInUseError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
