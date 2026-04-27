import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";
import { RegisterUseCase } from "@/use-cases/register";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function registerUsers(req: FastifyRequest, reply: FastifyReply) {
  const registerUsersSchema = z.object({
    username: z.string().max(38),
    email: z.email(),
    password: z.string().min(6).max(22)
  });

  const { username, email, password } = registerUsersSchema.parse(req.body);

  try {
    const usersRepository = new PrismaUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    await registerUseCase.execute(
      {
        username,
        email,
        password
      }
    );
  } catch (err) {
    return reply.status(409).send();
  }

  return reply.status(201).send();
}
