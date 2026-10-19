import { FastifyReply, FastifyRequest } from "fastify";

import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeUpdateUserProfileUseCase } from "@/use-cases/factories/make-update-user-profile-use-case";
import { patchProfileBodySchema } from "./schemas/patch-profile.schema";

export async function updateProfile(req: FastifyRequest, reply: FastifyReply) {
  const { username, email } = patchProfileBodySchema.parse(req.body);

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
