import { FastifyReply, FastifyRequest } from "fastify";

import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import z from "zod";
import { MakeUpdateExpensesUseCase } from "@/use-cases/factories/make-update-expenses-use-case";
import { CategoryAlreadyInUseError } from "@/use-cases/errors/category-already-in-use-error";

export async function update(req: FastifyRequest, reply: FastifyReply) {
  const updateExpensesQuerySchema = z.object({
    id: z.string(),
  });

  const updateExpensesBodySchema = z.object({
    title: z.string().nullable().default(null),
    enterprise: z.string().nullable().default(null),
    description: z.string().nullable().default(null),
    cnpj: z.string().nullable().default(null),
    source: z.string().nullable().default(null),
    price: z.coerce.number().nullable().default(null),
    card_last_digits: z.string().min(1).max(4).nullable().default(null),
    category_id: z.string().nullable().default(null),
  });

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
  } = updateExpensesBodySchema.parse(req.body);

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
