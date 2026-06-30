import { rateLimiter } from "@/http/middlewares/rate-limiter";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { verifyUserRole } from "@/http/middlewares/verify-user-role";

import { authenticate } from "./authenticate-controller";
import { fetchUsers } from "./fetch-users-controller";
import { profile } from "./profile-controller";
import { register } from "./register-controller";
import { requestResetPasswordTokens } from "./request-reset-password-controller";
import { resetPasswordTokens } from "./reset-password-controller";
import z from "zod";
import { FastifyTypedInstance } from "@/types";

export async function usersRoutes(app: FastifyTypedInstance) {
  app.post(
    "/users",
    {
      preHandler: [rateLimiter],
      schema: {
        tags: ["users"],
        description: "Create a new user",
        body: z.object({
          username: z.string().max(38),
          email: z.email(),
          password: z.string().min(6).max(22),
        }),
        response: {
          201: z.null().describe("User created."),
          409: z
            .object({
              message: z.string(),
            })
            .describe("E-mail already exists."),
        },
      },
    },
    register,
  );

  app.post(
    "/sessions",
    {
      preHandler: [rateLimiter],
      schema: {
        tags: ["users"],
        description: "Create a new session.",
        body: z.object({
          email: z.email(),
          password: z.string().min(6).max(22),
        }),
        response: {
          200: z
            .object({
              token: z.string(),
            })
            .describe("Session token."),
          400: z
            .object({
              message: z.string(),
            })
            .describe("Invalid credentials."),
        },
      },
    },
    authenticate,
  );
  app.post(
    "/reset-password/request",
    {
      preHandler: [rateLimiter],
      schema: {
        tags: ["users"],
        description: "Create a request of reset password.",
        body: z.object({
          email: z.email(),
        }),
        response: {
          200: z
            .object({
              url: z.string(),
            })
            .describe("URL for reset password."),
          404: z
            .object({
              message: z.string(),
            })
            .describe("Resource not found."),
        },
      },
    },
    requestResetPasswordTokens,
  );
  app.post(
    "/reset-password",
    {
      preHandler: [rateLimiter],
      schema: {
        tags: ["users"],
        description: "Reset password.",
        query: z.object({
          token: z.string(),
        }),
        body: z.object({
          password: z.string().min(6).max(22),
        }),
        response: {
          404: z
            .object({
              message: z.string(),
            })
            .describe("Rosource not found."),
          401: z
            .object({
              message: z.string(),
            })
            .describe("Reset password token invalid."),
        },
      },
    },
    resetPasswordTokens,
  );

  /* Authenticated */
  app.get(
    "/users",
    {
      preHandler: [verifyJWT, verifyUserRole("ADMIN"), rateLimiter],
      schema: {
        tags: ["users"],
        description: "List users.",
        query: z.object({
          query: z.string().optional().nullable(),
          page: z.coerce.number().default(1),
        }),
        response: {
          200: z
            .object({
              users: z.array(
                z.object({
                  name: z.string(),
                  id: z.string(),
                  email: z.string(),
                  password_hash: z.string(),
                  role: z.enum(["MEMBER", "ADMIN"]),
                  terms_accepted_at: z.date(),
                  terms_version: z.string(),
                }),
              ),
              meta: z.object({
                page: z.number(),
                perPage: z.number(),
                totalCount: z.number(),
                totalPages: z.number(),
              }),
            })
            .describe("Rosource not found."),
        },
      },
    },
    fetchUsers,
  );
  
  app.get(
    "/me",
    {
      preHandler: [verifyJWT, rateLimiter],
      schema: {
        tags: ["users"],
        description: "Get my profile.",
        response: {
          200: z
            .object({
              users: z.array(
                z.object({
                  name: z.string(),
                  id: z.string(),
                  email: z.string(),
                  password_hash: z.undefined(),
                  role: z.enum(["MEMBER", "ADMIN"]),
                  terms_accepted_at: z.date(),
                  terms_version: z.string(),
                }),
              ),
            })
            .describe("Get me."),
          404: z
            .object({
              message: z.string(),
            })
            .describe("Rosource not found."),
        },
      },
    },
    profile,
  );
}

/*
  preHandler: executa após o parsing do body — convenção recomendada pelo Fastify para autenticação/autorização.
  onRequest: executa antes do parsing — útil para rate limiting e CORS.
  A diferença de performance é imperceptível (microssegundos), então preHandler por convenção.
*/
