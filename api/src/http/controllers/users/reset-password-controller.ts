import { FastifyReply, FastifyRequest } from "fastify";

import { ResetPasswordTokenInvalid } from "@/use-cases/errors/reset-password-token-invalid-error";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { ReusingPasswordsIsNotAllowedError } from "@/use-cases/errors/reusing-passwords-is-not-allowed-error";
import { makeResetPassword } from "@/use-cases/factories/make-reset-password-use-case";
import {
  postResetPasswordBodySchema,
  postResetPasswordParamsSchema,
} from "./schemas/post-reset-password.schema";

export async function resetPasswordTokens(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const { token } = postResetPasswordParamsSchema.parse(req.query);
  const { password } = postResetPasswordBodySchema.parse(req.body);

  try {
    const resetPasswordUseCase = makeResetPassword();

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

    if (err instanceof ReusingPasswordsIsNotAllowedError) {
      return reply.status(422).send({ message: err.message });
    }

    throw err;
  }
}
