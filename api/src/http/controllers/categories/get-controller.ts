import { makeGetCategoriesUseCase } from "@/use-cases/factories/make-get-categories-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { Prisma } from "generated/prisma/client";
import z from "zod";

export async function getCategories(req: FastifyRequest, reply: FastifyReply) {
  const searchUsersSchema = z.object({
    contains: z.string().optional().nullable(),
    mode: z.string().optional().nullable(),
  });

  const { contains, mode } = searchUsersSchema.parse(req.query);

  try {
    const getCategoriesUseCase = makeGetCategoriesUseCase();
    const { categories } = await getCategoriesUseCase.execute({
      contains: contains ?? "", mode: mode as Prisma.QueryMode
    });

    return reply.status(200).send({ categories });
  } catch (err) {
    throw err;
  }

}