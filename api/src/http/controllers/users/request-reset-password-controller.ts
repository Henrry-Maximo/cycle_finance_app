import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeRequestResetPassword } from "@/use-cases/factories/make-request-reset-password-use-case";

export async function requestResetPasswordTokens(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.email(),
  });

  const { email } = authenticateBodySchema.parse(req.body);

  try {
    const requestResetPasswordUseCase = makeRequestResetPassword();

    const { url } = await requestResetPasswordUseCase.execute({
      email,
    });

    return reply.status(200).send({
      url,
    });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }
}
