import { FastifyReply, FastifyRequest } from "fastify";

import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeRequestResetPassword } from "@/use-cases/factories/make-request-reset-password-use-case";
import { postResetPasswordRequestBodySchema } from "./schemas/post-reset-password-request.schema";
import { sendEmail } from "@/lib/resend";

export async function requestResetPasswordTokens(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const { email } = postResetPasswordRequestBodySchema.parse(req.body);

  try {
    const requestResetPasswordUseCase = makeRequestResetPassword();

    const { url } = await requestResetPasswordUseCase.execute({
      email,
    });

    sendEmail({
      email,
      subject: "Cycle Finance | Gestão de Despesas - Recuperação de senha",
      content: `Clique no link para recuperar sua senha: ${url}`,
    });

    return reply.status(200).send();
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }
}
