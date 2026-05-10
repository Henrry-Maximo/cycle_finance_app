import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function register(req: FastifyRequest, reply: FastifyReply) {
  const registerUsersSchema = z.object({
    username: z.string().max(38),
    email: z.email(),
    password: z.string().min(6).max(22)
  });

  const { username, email, password } = registerUsersSchema.parse(req.body);

  try {
    // const usersRepository = new PrismaUsersRepository();
    // const registerUseCase = new RegisterUseCase(usersRepository);

    // função make que serve apenas para instanciação
    const registerUseCase = makeRegisterUseCase();

    await registerUseCase.execute(
      {
        username,
        email,
        password
      }
    );
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }

    // return reply.status(500).send(); // TODO: fix me
    throw err; // se não for um erro conhecido, joga pra camada cima
  }

  return reply.status(201).send();
}
