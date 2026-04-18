import fastify from "fastify";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import { env } from "./env";

export const app = fastify();

const adapter = new PrismaPg({ connectionString: env.DATABASE_URL! });
export const prisma = new PrismaClient({ adapter });

prisma.user.create({
  data: {
    name: "John Doe",
    email: "john.doe@example.com",
    password: "123456"
  }
});