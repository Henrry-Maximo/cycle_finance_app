import { ResourceNotFound } from "@/use-cases/errors/resource-not-found-error";
import { makeGetUserProfileUseCase } from "@/use-cases/factories/make-get-user-profile-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function getUserProfile(req: FastifyRequest, reply: FastifyReply) {
  const getUserProfileBodySchema = z.object({
    userId: z.string().min(1),
  });

  const { userId } = getUserProfileBodySchema.parse(req.body);

  try {
    const getUserProfileUseCase = makeGetUserProfileUseCase();

    const { user } = await getUserProfileUseCase.execute(
      {
        userId
      }
    );

    return reply.status(200).send({ user });
  } catch (err) {
    if (err instanceof ResourceNotFound) {
      return reply.status(404).send({ message: err.message });
    }

    // return reply.status(500).send(); // TODO: fix me
    throw err;
  }
}
