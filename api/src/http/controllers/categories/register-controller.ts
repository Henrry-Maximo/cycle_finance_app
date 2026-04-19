import { prisma } from "@/lib/prisma";
import { FastifyRequest, FastifyReply } from "fastify";
import z from "zod";

export async function registerCategories(req: FastifyRequest, reply: FastifyReply) {
  const registerCategoriesSchema = z.object({
    title: z.string(),
    description: z.string(),
  });

  const { title, description } = registerCategoriesSchema.parse(req.body);

  const categoryWithSameEmail = await prisma.category.findFirst({
    where: {
      title
    },
  });

  if (categoryWithSameEmail) {
    console.error("Category already exists.");
    throw new Error("Category already exists.");
  };

  await prisma.category.create({
    data: {
      title,
      description
    },
  });

  return reply.status(201).send();
}