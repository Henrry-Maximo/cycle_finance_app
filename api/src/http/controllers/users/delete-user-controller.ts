import { FastifyReply, FastifyRequest } from "fastify";

import { NotAuthorizedError } from "@/use-cases/errors/not-authorized-error";
import { makeDeleteUserUseCase } from "@/use-cases/factories/make-delete-profile-use-case";
import { deleteUsersParamsSchema } from "./schemas/delete-users.schema";

export async function deleteUser(req: FastifyRequest, reply: FastifyReply) {
  const { id } = deleteUsersParamsSchema.parse(req.params);

  try {
    const deleteUserUseCase = makeDeleteUserUseCase();

    await deleteUserUseCase.execute({
      id,
      userId: req.user.sub,
    });

    return reply.clearCookie("refreshToken").status(200).send();
  } catch (err) {
    if (err instanceof NotAuthorizedError) {
      return reply.status(401).send({ message: err.message });
    }

    throw err;
  }
}
