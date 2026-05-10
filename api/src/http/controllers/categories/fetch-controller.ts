import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeGetCategoriesUseCase } from "@/use-cases/factories/make-fetch-categories-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { Prisma } from "generated/prisma/client";
import z from "zod";

export async function fetchCategories(req: FastifyRequest, reply: FastifyReply) {
  const searchCategoriesSchema = z.object({
    contains: z.string().optional().nullable(),
    mode: z.string().optional().nullable(),
    page: z.number().default(1),
  });

  const { contains, mode, page } = searchCategoriesSchema.parse(req.query);

  try {
    const fetchCategoriesUseCase = makeGetCategoriesUseCase();

    const { categories } = await fetchCategoriesUseCase.execute({
      userId: req.user.sub,
      contains: contains ?? "",
      mode: mode as Prisma.QueryMode,
      page
    });

    return reply.status(200).send({ categories });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }

}