import { prisma } from "@/lib/prisma";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeRegisterCategoriesUseCase } from "@/use-cases/factories/make-register-categories-use-case";
import { FastifyRequest, FastifyReply } from "fastify";
import z from "zod";

export async function registerCategories(req: FastifyRequest, reply: FastifyReply) {
  const registerCategoriesSchema = z.object({
    title: z.string(),
    description: z.string(),
    user_id: z.string(),
  });

  const { title, description, user_id } = registerCategoriesSchema.parse(req.body);

  try {
    const registerCategoriesUseCase = makeRegisterCategoriesUseCase();

    registerCategoriesUseCase.execute({
      title,
      description,
      user_id
    });

  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(201).send();
}