import fastify from "fastify";
import { ZodError } from "zod";
import { appRoutes } from "./http/routes";
import cors from '@fastify/cors'
import { env } from "./env";

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

  if (env.NODE_ENV !== "production") {
    console.log(error);
  } else {
    // TODO: Here we should log to on external tool like DataDog/NewRelic/Sentry
  };

  // erro desconhecido
  return reply.status(500).send({ message: "Internal server error." });
});
