import fastifyCookie from "@fastify/cookie";
import { fastifyCors } from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastifyMultipart from "@fastify/multipart";
import fastifySwagger from "@fastify/swagger";
import fastifyStatic from "@fastify/static";
import swaggerUiDist from "swagger-ui-dist";
import fastify, { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { RateLimiterRes } from "rate-limiter-flexible";
import z, { ZodError } from "zod";

import { env } from "./env";
import { appRoutes } from "./http/routes";
import path from "node:path";
import { readFileSync } from "node:fs";

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

const description = readFileSync(
  path.join(process.cwd(), "public", "api-description.md"),
  "utf-8",
);

await app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Cycle Finance API",
      description,
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

// app.register(fastifySwaggerUi, {
//   routePrefix: "/docs-default",
//   uiConfig: {
//     docExpansion: "list",
//     deepLinking: true,
//     defaultModelsExpandDepth: 1,
//     displayRequestDuration: true,
//     filter: true,
//     syntaxHighlight: {
//       theme: "arta",
//     },
//   },
//   logo: {
//     type: "image/png",
//     content: readFileSync(path.join(process.cwd(), "public", "logo.png")),
//   },
//   theme: {
//     title: "Cycle Finance API Docs",
//     css: [
//       {
//         filename: "theme.css",
//         content: readFileSync(
//           path.join(process.cwd(), "public", "swagger-theme.css"),
//           "utf-8",
//         ),
//       },
//     ],
//   },
// });

// Swagger UI (js/css)
app.register(fastifyStatic, {
  root: swaggerUiDist.getAbsoluteFSPath(),
  prefix: "/swagger-assets/",
  decorateReply: false,
});

// registro dos arquivos de personalização do swagger
app.register(fastifyStatic, {
  root: path.join(process.cwd(), "public"),
  prefix: "/public/",
});

// esconder a rota
app.get("/openapi.json", { schema: { hide: true } }, async () => app.swagger());

// disponibilizar o acesso ao swagger personalizado
app.get("/docs", { schema: { hide: true } }, async (_req, reply) => {
  return reply.sendFile("docs.html"); // relativo à pasta public
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
