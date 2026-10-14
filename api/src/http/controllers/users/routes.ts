import z from "zod";

import { rateLimiter } from "@/http/middlewares/rate-limiter";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { verifyUserRole } from "@/http/middlewares/verify-user-role";
import { FastifyTypedInstance } from "@/types";

import { authenticate } from "./authenticate-controller";
import { deleteUser } from "./delete-user-controller";
import { fetchUsers } from "./fetch-users-controller";
import { profile } from "./profile-controller";
import { refresh } from "./refresh-token-jwt-controller";
import { register } from "./register-controller";
import { requestResetPasswordTokens } from "./request-reset-password-controller";
import { resetPasswordTokens } from "./reset-password-controller";
import { updateProfile } from "./update-profile-controller";
import { logout } from "./logout-controller";
import { env } from "@/env";

export async function usersRoutes(app: FastifyTypedInstance) {
  app.post(
    "/users",
    {
      preHandler: [rateLimiter],
      schema: {
        tags: ["Users"],
        summary: "Register a new user account",
        description:
          "Creates a new user account with the **member** role by default. Returns `409` if the provided email is already registered.",
        body: z.object({
          username: z.string().max(38).meta({ example: "johndoe" }),
          email: z.email().meta({ example: "email@example.com" }),
          password: z
            .string()
            .min(6)
            .max(22)
            .meta({ example: "a_secure_password" }),
        }),
        response: {
          201: z.null().describe("User created.").meta({
            example: {},
          }),
          409: z
            .object({
              message: z.string(),
            })
            .describe("E-mail already exists.")
            .meta({
              example: { message: "E-mail already exists." },
            }),
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
        tags: ["Auth"],
        summary: "Authenticate and start a session",
        description:
          "Validates credentials and returns a short-lived JWT token (`10min`) in the response body. A long-lived `refreshToken` (`7d`) is set as an **httpOnly** cookie. Returns `400` if credentials are invalid.",
        body: z.object({
          email: z.email().meta({ example: "email@example.com" }),
          password: z
            .string()
            .min(6)
            .max(22)
            .meta({ example: "a_secure_password" }),
        }),
        response: {
          200: z
            .object({
              token: z.string().meta({
                example: "asdasqwewe1232423rwefsdcsdcs32423423ewqewd23",
              }),
            })
            .describe("Session token."),
          400: z
            .object({
              message: z.string().meta({ example: "Invalid credentials." }),
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
        tags: ["Auth"],
        summary: "Request a password reset token",
        description:
          "Sends a password reset token URL for the provided email. The token expires in **15 minutes** and can only be used once. Returns `404` if the email is not registered.",
        body: z.object({
          email: z.email().meta({ example: "email@example.com" }),
        }),
        response: {
          200: z
            .object({
              url: z.string().meta({
                example: `${env.APP_URL}/reset-password?token=eyJhbGciOiJIUzI...`,
              }),
            })
            .describe("URL for reset password."),
          404: z
            .object({
              message: z.string().meta({ example: "Resource not found." }),
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
        tags: ["Auth"],
        summary: "Reset user password",
        description:
          "Resets the user password using a valid reset token passed as a query parameter. Returns `401` if the token is expired or already used. The new password cannot be the same as the previous one.",
        query: z.object({
          token: z.string().meta({ example: "eyJhbGciOiJIUzI..." }),
        }),
        body: z.object({
          password: z
            .string()
            .min(6)
            .max(22)
            .meta({ example: "a_new_secure_password" }),
        }),
        response: {
          404: z
            .object({
              message: z.string().meta({ example: "Resource not found." }),
            })
            .describe("Rosource not found."),
          401: z
            .object({
              message: z
                .string()
                .meta({ example: "Reset password token invalid." }),
            })
            .describe("Reset password token invalid."),
          422: z.object({
            messge: z
              .string()
              .meta({ example: "Reusing passwords is not allowed." }),
          }),
        },
      },
    },
    resetPasswordTokens,
  );

  /* Only authenticated */
  app.get(
    "/users",
    {
      preHandler: [verifyJWT, verifyUserRole("ADMIN"), rateLimiter],
      schema: {
        security: [
          {
            bearerAuth: [],
          },
        ],
        tags: ["Users"],
        summary: "List all registered users",
        description:
          "Returns a paginated list of all users. **Requires ADMIN role.** Passwords are never exposed in the response.",
        query: z.object({
          query: z.string().optional().nullable().meta({ example: "john" }),
          page: z.coerce.number().default(1),
        }),
        response: {
          200: z
            .object({
              users: z.array(
                z.object({
                  id: z.string().meta({ example: "eyJhbGciOiJIUzI..." }),
                  name: z.string().meta({ example: "John Doe" }),
                  email: z.string().meta({ example: "email@example.com" }),
                  // password_hash: z.string(),
                  role: z.enum(["MEMBER", "ADMIN"]),
                  terms_accepted_at: z.date(),
                  terms_version: z.string().meta({ example: "v1" }),
                }),
              ),
              meta: z.object({
                page: z.number(),
                perPage: z.number().meta({ example: 10 }),
                totalCount: z.number(),
                totalPages: z.number(),
              }),
            })
            .describe("Return all the users."),
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
        security: [
          {
            bearerAuth: [],
          },
        ],
        tags: ["Users"],
        summary: "Get authenticated user profile",
        description:
          "Returns the profile information of the currently authenticated user based on the JWT token.",
        response: {
          200: z
            .object({
              id: z.string().meta({ example: "eyJhbGciOiJIUzI..." }),
              name: z.string().meta({ example: "johndoe" }),
              email: z.string().meta({ example: "email@example.com" }),
              role: z.enum(["MEMBER", "ADMIN"]),
              terms_accepted_at: z.date(),
              terms_version: z.string().meta({ example: "v1" }),
            })
            .describe("Profile informations."),
          404: z
            .object({
              message: z.string().meta({ example: "Resource not found." }),
            })
            .describe("Resource not found."),
        },
      },
    },
    profile,
  );

  app.post(
    "/logout",
    {
      preHandler: [verifyJWT, rateLimiter],
      schema: {
        security: [
          {
            bearerAuth: [],
          },
        ],
        tags: ["Auth"],
        summary: "Logout and invalidate session",
        description:
          "Clears the `refreshToken` httpOnly cookie, effectively ending the session. The JWT token expires naturally within 10 minutes.",
        response: {
          200: z
            .object({
              message: z.string().meta({ example: "Logout from user." }),
            })
            .describe("Logout from user."),
        },
      },
    },
    logout,
  );

  app.patch(
    "/me",
    {
      preHandler: [verifyJWT, rateLimiter],
      schema: {
        security: [
          {
            bearerAuth: [],
          },
        ],
        tags: ["Users"],
        summary: "Update authenticated user profile",
        description:
          "Partially updates the profile of the currently authenticated user. Only the fields provided in the request body will be updated.",
        response: {
          200: z
            .object({
              username: z.string(),
              email: z.string(),
            })
            .describe("Profile update with successful."),
          404: z
            .object({
              message: z.string(),
            })
            .describe("Rosource not found."),
        },
      },
    },
    updateProfile,
  );

  // updated in a way parcial
  app.patch(
    "/token/refresh",
    {
      preHandler: [rateLimiter],
      schema: {
        tags: ["Auth"],
        summary: "Refresh the JWT access token",
        description:
          "Issues a new short-lived JWT token using the `refreshToken` httpOnly cookie. Also rotates the `refreshToken` cookie with a new 7-day expiration. No Authorization header required.",
        response: {
          200: z.object({
            token: z.string().meta({ example: "eyJhbGciOiJIUzI..." }),
          }),
        },
      },
    },
    refresh,
  );

  app.delete(
    "/users/:id",
    {
      preHandler: [verifyJWT, rateLimiter],
      schema: {
        security: [
          {
            bearerAuth: [],
          },
        ],
        tags: ["Users"],
        summary: "Delete a user account",
        description:
          "Permanently deletes the user account and all associated expenses, categories, and password reset tokens in cascade. Also clears the `refreshToken` cookie.",
        params: z.object({
          id: z.string().meta({ example: "eyJhbGciOiJIUzI..." }),
        }),
        response: {
          200: z.null().describe("User delete with successful."),
          401: z
            .object({
              message: z.string().meta({ example: "Not authorized." }),
            })
            .describe("Not authorized."),
        },
      },
    },
    deleteUser,
  );
}

/*
  preHandler: executa após o parsing do body — convenção recomendada pelo Fastify para autenticação/autorização.
  onRequest: executa antes do parsing — útil para rate limiting e CORS.
  A diferença de performance é imperceptível (microssegundos), então preHandler por convenção.
*/
