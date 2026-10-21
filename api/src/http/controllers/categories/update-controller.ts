import { FastifyReply, FastifyRequest } from "fastify";

import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { MakeUpdateCategoriesUseCase } from "@/use-cases/factories/make-update-categories-use-case";
import {
  patchCategoryBodySchema,
  patchCategoryParamsSchema,
} from "./schemas/patch-category.schema";

export async function update(req: FastifyRequest, reply: FastifyReply) {
  const { id } = patchCategoryParamsSchema.parse(req.query);
  const { title, description } = patchCategoryBodySchema.parse(req.body);

  try {
    const updateCategoriesUseCase = MakeUpdateCategoriesUseCase();

    const { category } = await updateCategoriesUseCase.execute({
      userId: req.user.sub,
      categoryId: id,
      ...(title && { title }),
      ...(description && { description }),
    });

    return reply.status(200).send(category);
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }
}
