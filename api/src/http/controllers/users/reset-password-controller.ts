import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeResetPassword } from "@/use-cases/factories/make-reset-password-use-case";
import { ResetPasswordTokenInvalid } from "@/use-cases/errors/reset-password-token-invalid-error";

export async function resetPasswordTokens(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const querySchema = z.object({ token: z.string() });
  const bodySchema = z.object({ password: z.string() });

  const { token } = querySchema.parse(req.query);
  const { password } = bodySchema.parse(req.body);

  try {
    const resetPasswordUseCase = makeResetPassword();
    console.log(password);

    await resetPasswordUseCase.execute({
      token,
      password,
    });

    return reply.status(200).send();
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    if (err instanceof ResetPasswordTokenInvalid) {
      return reply.status(401).send({ message: err.message });
    }

    throw err;
  }
}
