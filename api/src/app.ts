import fastifyCookie from "@fastify/cookie";
import { fastifyCors } from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastifyMultipart from "@fastify/multipart";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastify, { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { RateLimiterRes } from "rate-limiter-flexible";
import z, { ZodError } from "zod";

import { readFileSync } from "node:fs";
import path from "node:path";
import { env } from "./env";
import { appRoutes } from "./http/routes";

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

await app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Cycle Finance API",
      description:
        "Cycle Finance is a financial management system that allows users to record expenses manually or by capturing receipts using their device camera. \nThe API provides expense tracking, categorization, analytics by day/month/year, JWT authentication with refresh token support, role-based access control (RBAC), and AI-powered receipt scanning via Gemini.",
      version: "1.0.0",
      contact: {
        name: "Henrique Maximo",
        email: "Henrrylimadasilva@gmail.com",
        url: "https://www.linkedin.com/in/henrique-maximo/",
      },
      termsOfService: "https://cycle-finance-app.vercel.app/terms-of-api",
      license: {
        name: "MIT",
      },
    },
    servers: [
      { url: "http://localhost:3333", description: "Development" },
      {
        url: "https://cycle-finance-app.vercel.app/",
        description: "Production",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    externalDocs: {
      url: "https://github.com/Henrry-Maximo/cycle_finance_app",
      description: "GitHub Repository API Documentation",
    },
    tags: [
      { name: "Auth", description: "Authentication and session management" },
      { name: "Users", description: "User profile and account management" },
      { name: "Expenses", description: "Expense registration and tracking" },
      { name: "Categories", description: "Expense categorization" },
    ],
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "list",
    deepLinking: true,
    defaultModelsExpandDepth: 1,
    displayRequestDuration: true,
    filter: true,
    syntaxHighlight: {
      theme: "arta",
    },
  },
  logo: {
    type: "image/png",
    content: readFileSync(
      path.join(process.cwd(), "src", "public", "logo.png"),
    ),
  },
  theme: {
    title: "Cycle Finance API Docs",
    css: [
      {
        filename: "theme.css",
        content: readFileSync(
          path.join(process.cwd(), "src", "public", "swagger-theme.css"),
          "utf-8",
        ),
      },
    ],
  },
});

app.register(appRoutes);

app.setErrorHandler(
  (error: FastifyError, _: FastifyRequest, reply: FastifyReply) => {
    if (error instanceof ZodError) {
      return reply
        .status(400)
        .send({ message: "Validation error.", issues: z.treeifyError(error) });
    }

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
