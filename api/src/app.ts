import cors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import z, { ZodError } from "zod";

import { env } from "./env";
import { appRoutes } from "./http/routes";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(cors, {
  origin: "*",
});

app.register(appRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: z.treeifyError(error) });
  }

  if (env.NODE_ENV !== "production") {
    console.log(error);
  } else {
    // TODO: Here we should log to on external tool like DataDog/NewRelic/Sentry
  }

  // erro desconhecido
  return reply.status(500).send({ message: "Internal server error." });
});
