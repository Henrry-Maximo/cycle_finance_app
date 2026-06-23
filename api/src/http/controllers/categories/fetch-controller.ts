import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

import { Prisma } from "@/generated/prisma/client";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeGetCategoriesUseCase } from "@/use-cases/factories/make-fetch-categories-use-case";

export async function fetchCategories(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const searchCategoriesSchema = z.object({
    query: z.string().optional().nullable(),
    page: z.coerce.number().default(1),
  });

  const { query, page } = searchCategoriesSchema.parse(req.query);

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
