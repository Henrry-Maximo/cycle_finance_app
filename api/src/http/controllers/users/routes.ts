import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middlewares/verify-jwt";

import { authenticate } from "./authenticate-controller";
import { fetchUsers } from "./fetch-users-controller";
import { profile } from "./profile-controller";
import { register } from "./register-controller";
import { requestResetPasswordTokens } from "./request-reset-password-controller";
import { verifyUserRole } from "@/http/middlewares/verify-user-role";
import { resetPasswordTokens } from "./reset-password-controller";
import { rateLimiter } from "@/http/middlewares/rate-limiter";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", { preHandler: [rateLimiter] }, register);
  app.post("/sessions", { preHandler: [rateLimiter] }, authenticate);
  app.post(
    "/reset-password/request",
    { preHandler: [rateLimiter] },
    requestResetPasswordTokens,
  );
  app.post(
    "/reset-password",
    { preHandler: [rateLimiter] },
    resetPasswordTokens,
  );

  /* Authenticated */
  app.get(
    "/users",
    { preHandler: [verifyJWT, verifyUserRole("ADMIN"), rateLimiter] },
    fetchUsers,
  );
  app.get("/me", { preHandler: [verifyJWT, rateLimiter] }, profile);
}

/*
  preHandler: executa após o parsing do body — convenção recomendada pelo Fastify para autenticação/autorização.
  onRequest: executa antes do parsing — útil para rate limiting e CORS.
  A diferença de performance é imperceptível (microssegundos), então preHandler por convenção.
*/
