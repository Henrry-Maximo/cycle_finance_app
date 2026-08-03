import { fastifyCors } from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastify, { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import z, { ZodError } from "zod";

import { env } from "./env";
import { appRoutes } from "./http/routes";

import {
  validatorCompiler,
  serializerCompiler,
  ZodTypeProvider,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { RateLimiterRes } from "rate-limiter-flexible";
import fastifyMultipart from "@fastify/multipart";
import fastifyCookie from "@fastify/cookie";

export const app = fastify({
  logger:
    env.NODE_ENV === "dev" ? { transport: { target: "pino-pretty" } } : true,
  trustProxy: true,
}).withTypeProvider<ZodTypeProvider>();

app.register(fastifyMultipart, {
  limits: {
    fileSize: env.MAX_FILE_SIZE_MB * 1024 * 1024, // 5MB for upload files limit
  },
});

// usando o zod validação de todos os dados que vão entrar
app.setValidatorCompiler(validatorCompiler);

// usando o zod para transformar (serialização) os dados de saída
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false, // a informação (cookie) não é assinado (processo de hash, para validar eventualmente)
  },
  sign: {
    expiresIn: "10m", // 10 minutos: refresh token para criar um novo JWT
  },
});

// criar / recuperar cookies na requisição
app.register(fastifyCookie);

app.register(fastifyCors, {
  origin: env.APP_URL,
  credentials: true, // enabled cookies
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
});

app.register(fastifySwagger, {
  // várias especifícações: openapi / swagger (formatos)
  openapi: {
    info: {
      title: "Typed API",
      description: "API Restful Cycle Finance for management of expenses.",
      version: "1.0.0",
      contact: {
        name: "Henrique Maximo",
        email: "Henrrylimadasilva@gmail.com",
        url: "https://www.linkedin.com/in/henrique-maximo/",
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

app.register(appRoutes);

app.setErrorHandler(
  (error: FastifyError, _: FastifyRequest, reply: FastifyReply) => {
    if (error instanceof ZodError) {
      return reply
        .status(400)
        .send({ message: "Validation error.", issues: z.treeifyError(error) });
    }

    // if (error.) {
    //   return reply.status(429).send({ message: "Too Many Requests." });
    // }

    if (error instanceof RateLimiterRes) {
      return reply.status(429).send({
        message: "Too Many Requests",
      });
    }

    if (env.NODE_ENV !== "production") {
      console.log(error);
    } else {
      // TODO: Here we should log to on external tool like DataDog/NewRelic/Sentry
    }

    // erro desconhecido
    return reply.status(500).send({ message: "Internal server error." });
  },
);
