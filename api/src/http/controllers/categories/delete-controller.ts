import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

import { CategoryIsLinkedExpenseError } from "@/use-cases/errors/category-is-linked-expense-error";
import { NotAuthorizedError } from "@/use-cases/errors/not-authorized-error";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeDeleteCategoryUseCase } from "@/use-cases/factories/make-delete-category-use-case";

export async function deleteCategory(req: FastifyRequest, reply: FastifyReply) {
  const deleteCategoriesSchema = z.object({
    id: z.string(),
  });

  const { id } = deleteCategoriesSchema.parse(req.query);

  try {
    const deleteCategoriesUseCase = makeDeleteCategoryUseCase();

    await deleteCategoriesUseCase.execute({
      id,
      userId: req.user.sub,
    });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    if (err instanceof CategoryIsLinkedExpenseError) {
      return reply.status(409).send({ message: err.message });
    }

    if (err instanceof NotAuthorizedError) {
      return reply.status(401).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(201).send();
}
