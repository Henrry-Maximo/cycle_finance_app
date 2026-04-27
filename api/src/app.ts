import fastify from "fastify";
import { ZodError } from "zod";
import { appRoutes } from "./http/routes";
import cors from '@fastify/cors'

export const app = fastify();

app.register(cors, {
  origin: '*'
});

app.register(appRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: error.format() });
  };

  return reply.status(500).send({ message: "Iternal Server Error." });
});
