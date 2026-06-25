import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

import { CategoryAlreadyExistsError } from "@/use-cases/errors/category-already-exists-error";
import { CategoryLimitReachedError } from "@/use-cases/errors/category-limit-reached-error";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeRegisterCategoriesUseCase } from "@/use-cases/factories/make-register-categories-use-case";

export async function register(req: FastifyRequest, reply: FastifyReply) {
  const registerCategoriesSchema = z.object({
    title: z.string(),
    description: z.string(),
  });

  const { title, description } = registerCategoriesSchema.parse(req.body);

  try {
    const registerCategoriesUseCase = makeRegisterCategoriesUseCase();

    await registerCategoriesUseCase.execute({
      title,
      description,
      user_id: req.user.sub,
    });

    return reply.status(201).send();
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    if (err instanceof CategoryLimitReachedError) {
      return reply.status(429).send({ message: err.message });
    }

    if (err instanceof CategoryAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
