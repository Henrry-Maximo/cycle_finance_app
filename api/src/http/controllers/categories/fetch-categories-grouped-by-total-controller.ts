import { FastifyReply, FastifyRequest } from "fastify";

import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeFetchCategoriesGroupedByTotalUseCase } from "@/use-cases/factories/make-fetch-categories-grouped-by-total";

export async function fetchCategoriesGroupedByTotal(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const fetchCategoriesGroupedByTotalUseCase =
      makeFetchCategoriesGroupedByTotalUseCase();

    const { categories } = await fetchCategoriesGroupedByTotalUseCase.execute({
      userId: req.user.sub,
    });

    return reply.status(200).send({ categories });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }
}
