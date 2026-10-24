import { FastifyReply, FastifyRequest } from "fastify";

import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeRegisterExpensesUseCase } from "@/use-cases/factories/make-register-expenses-use-case";
import { registerExpenseBodySchema } from "./schemas/register-expense.schema";

export async function register(req: FastifyRequest, reply: FastifyReply) {
  const {
    title,
    enterprise,
    description,
    cnpj,
    source,
    price,
    card_last_digits,
    created_at,
    category_id,
  } = registerExpenseBodySchema.parse(req.body);

  try {
    const registerExpensesUseCase = makeRegisterExpensesUseCase();

    await registerExpensesUseCase.execute({
      title,
      enterprise,
      description,
      cnpj,
      source,
      price,
      card_last_digits,
      created_at,
      category_id,
      user_id: req.user.sub,
    });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(201).send();
}
