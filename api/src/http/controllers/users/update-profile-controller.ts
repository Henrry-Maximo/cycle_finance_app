import { FastifyReply, FastifyRequest } from "fastify";

import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import z from "zod";
import { makeUpdateUserProfileUseCase } from "@/use-cases/factories/make-update-user-profile-use-case";

export async function updateProfile(req: FastifyRequest, reply: FastifyReply) {
  const updateUserProfileBodySchema = z.object({
    username: z.string().min(1).max(38).nullable(),
    email: z.email().nullable(),
  });

  const { username, email } = updateUserProfileBodySchema.parse(req.body);

  try {
    const updateUserProfileUseCase = makeUpdateUserProfileUseCase();

    const { user } = await updateUserProfileUseCase.execute({
      userId: req.user.sub,
      email,
      username,
    });

    return reply.status(200).send({
      username: user.name,
      email: user.email,
    });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }
}
