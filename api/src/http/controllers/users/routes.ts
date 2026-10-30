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
import {
  authenticateSessionsBodySchema,
  authenticateSessionsResponseSchema,
} from "./schemas/authenticate-sessions.schema";
import {
  registerUsersBodySchema,
  registerUsersResponseSchema,
} from "./schemas/register-users.schema";
import {
  postResetPasswordRequestBodySchema,
  postResetPasswordRequestResponseSchema,
} from "./schemas/post-reset-password-request.schema";
import {
  postResetPasswordBodySchema,
  postResetPasswordParamsSchema,
  postResetPasswordResponseSchema,
} from "./schemas/post-reset-password.schema";
import {
  getUsersQuerySchema,
  getUsersResponseSchema,
} from "./schemas/get-users.schema";
import { getProfileResponseSchema } from "./schemas/get-profile.schema";
import { postLogoutResponseSchema } from "./schemas/post-logout.schema";
import {
  patchProfileBodySchema,
  patchProfileResponseSchema,
} from "./schemas/patch-profile.schema";
import { patchTokenRefreshResponseSchema } from "./schemas/patch-token-refresh.schema";
import {
  deleteUsersParamsSchema,
  deleteUsersResponseSchema,
} from "./schemas/delete-users.schema";

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
        body: registerUsersBodySchema,
        response: registerUsersResponseSchema,
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
        body: authenticateSessionsBodySchema,
        response: authenticateSessionsResponseSchema,
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
        body: postResetPasswordRequestBodySchema,
        response: postResetPasswordRequestResponseSchema,
      },
    },
    requestResetPasswordTokens,
  );

  app.post(
    "/reset-password/:token",
    {
      preHandler: [rateLimiter],
      schema: {
        tags: ["Auth"],
        summary: "Reset user password",
        description:
          "Resets the user password using a valid reset token passed as a query parameter. Returns `401` if the token is expired or already used. The new password cannot be the same as the previous one.",
        params: postResetPasswordParamsSchema,
        body: postResetPasswordBodySchema,
        response: postResetPasswordResponseSchema,
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
        query: getUsersQuerySchema,
        response: getUsersResponseSchema,
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
        response: getProfileResponseSchema,
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
        response: postLogoutResponseSchema,
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
        body: patchProfileBodySchema,
        response: patchProfileResponseSchema,
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
        response: patchTokenRefreshResponseSchema,
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
        params: deleteUsersParamsSchema,
        response: deleteUsersResponseSchema,
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
