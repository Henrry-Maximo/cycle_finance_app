import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeGetCategoriesUseCase } from "@/use-cases/factories/make-fetch-categories-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { Prisma } from "generated/prisma/client";
import z from "zod";

export async function fetchUserCategoriesHistory(req: FastifyRequest, reply: FastifyReply) {
  const searchCategoriesSchema = z.object({
    id: z.string(),
    contains: z.string().optional().nullable(),
    mode: z.string().optional().nullable(),
  });

  const { id, contains, mode } = searchCategoriesSchema.parse(req.query);

  try {
    const fetchCategoriesUseCase = makeGetCategoriesUseCase();
    const { categories } = await fetchCategoriesUseCase.execute({
      userId: id,
      contains: contains ?? "",
      mode: mode as Prisma.QueryMode
    });

    return reply.status(200).send({ categories });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }

}