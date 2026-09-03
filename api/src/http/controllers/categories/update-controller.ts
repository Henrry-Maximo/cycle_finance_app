import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { MakeUpdateCategoriesUseCase } from "@/use-cases/factories/make-update-categories-use-case";

export async function update(req: FastifyRequest, reply: FastifyReply) {
  const updateCategoriesQuerySchema = z.object({
    id: z.string(),
  });

  const updateCategoriesBodySchema = z.object({
    title: z.string().nullable().default(null),
    description: z.string().nullable().default(null),
  });

  const { id } = updateCategoriesQuerySchema.parse(req.query);

  const { title, description } = updateCategoriesBodySchema.parse(req.body);

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
