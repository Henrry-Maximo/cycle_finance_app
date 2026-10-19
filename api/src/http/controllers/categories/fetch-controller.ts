import { FastifyReply, FastifyRequest } from "fastify";

import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeGetCategoriesUseCase } from "@/use-cases/factories/make-fetch-categories-use-case";
import { getCategoryQuerySchema } from "./schemas/get-category.schema";

export async function fetchCategories(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const { query, page } = getCategoryQuerySchema.parse(req.query);

  try {
    const fetchCategoriesUseCase = makeGetCategoriesUseCase();

    const { categories, meta } = await fetchCategoriesUseCase.execute({
      userId: req.user.sub,
      categoryName: query ?? "",
      pageIndex: page,
    });

    return reply.status(200).send({ categories, meta });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }
}
