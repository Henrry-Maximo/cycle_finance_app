import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import { env } from "./env";
import z, { ZodError } from "zod";
import { hash } from 'bcryptjs';

export const app = fastify();

const adapter = new PrismaPg({ connectionString: env.DATABASE_URL! });
export const prisma = new PrismaClient({ adapter });

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: error.format() });
  };

  return reply.status(500).send({ message: "Iternal Server Error." });
});

app.get("/users", (async (req: FastifyRequest, reply: FastifyReply) => {
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
}));

app.get("/categories", (async (req: FastifyRequest, reply: FastifyReply) => {
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
}));

app.get("/expenses", (async (req: FastifyRequest, reply: FastifyReply) => {
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

  const expenses = await prisma.expense.findMany({
    where: {
      title: filter
    },
  });

  return reply.status(200).send({ expenses });
}));

app.post("/users", (async (req: FastifyRequest, reply: FastifyReply) => {
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
}));

app.post("/categories", (async (req: FastifyRequest, reply: FastifyReply) => {
  const registerCategoriesSchema = z.object({
    title: z.string(),
    description: z.string(),
  });

  const { title, description } = registerCategoriesSchema.parse(req.body);

  const category = await prisma.category.findFirst({
    where: {
      title
    },
  });

  if (category) {
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
}));

app.post("/expenses", (async (req: FastifyRequest, reply: FastifyReply) => {
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
}));
