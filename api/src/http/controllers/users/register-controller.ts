import { prisma } from "@/lib/prisma";
import { registerUseCase } from "@/use-cases/register";
import { hash } from "bcryptjs";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function registerUsers(req: FastifyRequest, reply: FastifyReply) {
  const registerUsersSchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(3)
  });

  const { name, email, password } = registerUsersSchema.parse(req.body);

  try {
    await registerUseCase({ name, email, password  });
  } catch (err) {
    return reply.status(409).send();
  }

  return reply.status(201).send();
}
