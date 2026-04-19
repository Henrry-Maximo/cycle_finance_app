import { prisma } from "@/lib/prisma";
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

  const user = await prisma.user.findUnique({
    where: {
      email
    },
  });

  if (user) {
    console.error("User already exists.");
    throw new Error("User already exists.");
  };

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: await hash(password, 6)
    },
  });

  return reply.status(201).send();
}
