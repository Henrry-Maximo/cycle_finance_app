import { FastifyReply, FastifyRequest } from "fastify";

import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";
import { registerUsersBodySchema } from "./schemas/register-users.schema";

export async function register(req: FastifyRequest, reply: FastifyReply) {
  const { username, email, password } = registerUsersBodySchema.parse(req.body);

  try {
    const registerUseCase = makeRegisterUseCase();

    await registerUseCase.execute({
      username,
      email,
      password,
    });

    return reply.status(201).send();
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }

    // return reply.status(500).send(); // TODO: fix me
    throw err; // se não for um erro conhecido, joga pra camada cima
  }
}
