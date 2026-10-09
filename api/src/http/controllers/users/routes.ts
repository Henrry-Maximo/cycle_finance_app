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

export async function usersRoutes(app: FastifyTypedInstance) {
  app.post(
    "/users",
    {
      preHandler: [rateLimiter],
      schema: {
        tags: ["Users"],
        summary: "Register a new user account",
        description: "Creates a new user account with the **member** role by default. Returns `409` if the provided email is already registered.",
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
        tags: ["Auth"],
        summary: "Authenticate and start a session",
        description: "Validates credentials and returns a short-lived JWT token (`10min`) in the response body. A long-lived `refreshToken` (`7d`) is set as an **httpOnly** cookie. Returns `400` if credentials are invalid.",
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
        tags: ["Auth"],
        summary: "Request a password reset token",
        description: "Sends a password reset token URL for the provided email. The token expires in **15 minutes** and can only be used once. Returns `404` if the email is not registered.",
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
        tags: ["Auth"],
        summary: "Reset user password",
        description: "Resets the user password using a valid reset token passed as a query parameter. Returns `401` if the token is expired or already used. The new password cannot be the same as the previous one.",
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
        description: "Returns a paginated list of all users. **Requires ADMIN role.** Passwords are never exposed in the response.",
        query: z.object({
          query: z.string().optional().nullable(),
          page: z.coerce.number().default(1),
        }),
        response: {
          200: z
            .object({
              users: z.array(
                z.object({
                  id: z.string(),
                  name: z.string(),
                  email: z.string(),
                  // password_hash: z.string(),
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
        security: [
          {
            bearerAuth: [],
          },
        ],
        tags: ["Users"],
        summary: "Get authenticated user profile",
        description: "Returns the profile information of the currently authenticated user based on the JWT token.",
        response: {
          200: z
            .object({
              id: z.string(),
              name: z.string(),
              email: z.string(),
              role: z.enum(["MEMBER", "ADMIN"]),
              terms_accepted_at: z.date(),
              terms_version: z.string(),
            })
            .describe("Profile informations."),
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
        description: "Clears the `refreshToken` httpOnly cookie, effectively ending the session. The JWT token expires naturally within 10 minutes.",
        response: {
          200: z
            .object({
              message: z.string(),
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
        description: "Partially updates the profile of the currently authenticated user. Only the fields provided in the request body will be updated.",
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
        description: "Issues a new short-lived JWT token using the `refreshToken` httpOnly cookie. Also rotates the `refreshToken` cookie with a new 7-day expiration. No Authorization header required.",
        response: {
          200: z.object({
            token: z.string(),
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
        description: "Permanently deletes the user account and all associated expenses, categories, and password reset tokens in cascade. Also clears the `refreshToken` cookie.",
        response: {
          200: z.null().describe("User delete with successful."),
          401: z
            .object({
              message: z.string(),
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
