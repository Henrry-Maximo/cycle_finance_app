import { FastifyReply, FastifyRequest } from "fastify";

import { makeDeleteUserUseCase } from "@/use-cases/factories/make-delete-profile-use-case";
import { NotAuthorizedError } from "@/use-cases/errors/not-authorized-error";
import z from "zod";

export async function deleteUser(req: FastifyRequest, reply: FastifyReply) {
  const deleteUserParamsSchema = z.object({
    id: z.uuid(),
  });

  const { id } = deleteUserParamsSchema.parse(req.params);

  try {
    const deleteUserUseCase = makeDeleteUserUseCase();

    await deleteUserUseCase.execute({
      id,
      userId: req.user.sub,
    });

    return reply.status(200).send();
  } catch (err) {
    if (err instanceof NotAuthorizedError) {
      return reply.status(401).send({ message: err.message });
    }

    throw err;
  }
}
