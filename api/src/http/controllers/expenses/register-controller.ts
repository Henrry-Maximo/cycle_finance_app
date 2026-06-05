import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeRegisterExpensesUseCase } from "@/use-cases/factories/make-register-expenses-use-case";

export async function register(req: FastifyRequest, reply: FastifyReply) {
  const registerExpensesSchema = z.object({
    title: z.string(),
    enterprise: z.string(),
    description: z.string().nullable().optional().default(null),
    cnpj: z.string().nullable().optional().default(null),
    source: z.string().nullable().optional().default(null),
    price: z.coerce.number(),
    card_last_digits: z.string().min(1).max(4),
    category_id: z.string(),
  });

  const {
    title,
    enterprise,
    description,
    cnpj,
    source,
    price,
    card_last_digits,
    category_id,
  } = registerExpensesSchema.parse(req.body);

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
