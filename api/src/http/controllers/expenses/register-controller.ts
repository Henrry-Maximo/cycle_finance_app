import { prisma } from "@/lib/prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function registerExpenses(req: FastifyRequest, reply: FastifyReply) {
  const registerExpensesSchema = z.object({
    title: z.string(),
    enterprise: z.string(),
    description: z.string().nullable().optional().default(null),
    CNPJ: z.string().nullable().optional().default(null),
    source: z.string().nullable().optional().default(null),
    price: z.coerce.number(),
    card_last_digits: z.string().min(1).max(4),

    user_id: z.string(),
    category_id: z.coerce.number(),
  });

  const data = registerExpensesSchema.parse(req.body);

  await prisma.expense.create({
    data: {
      ...data,
      price: data.price * 100
    }
  });

  return reply.status(201).send();
}