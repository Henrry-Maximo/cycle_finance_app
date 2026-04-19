import { prisma } from "@/lib/prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function getCategories(req: FastifyRequest, reply: FastifyReply) {
  const searchUsersSchema = z.object({
      name: z.string().optional(),
    });
  
    const { name } = searchUsersSchema.parse(req.query);
  
    let filter = {} as {
      contains?: string;
      mode?: 'insensitive' | 'default';
    };
  
    if (name) {
      filter = {
        contains: name,
        mode: 'insensitive'
      };
    };
  
    const categories = await prisma.category.findMany({
      where: {
        title: filter
      },
    });
  
    return reply.status(200).send({ categories });
}