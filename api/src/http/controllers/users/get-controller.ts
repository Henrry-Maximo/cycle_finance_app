import { prisma } from "@/lib/prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function getUsers(req: FastifyRequest, reply: FastifyReply) {
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
  
    const users = await prisma.user.findMany({
      where: {
        name: filter
      },
    });
  
    return reply.status(200).send({ users });
}