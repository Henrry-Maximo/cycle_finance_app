import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middlewares/verify-jwt";

import { authenticate } from "./authenticate-controller";
import { fetchUsers } from "./fetch-users-controller";
import { profile } from "./profile-controller";
import { register } from "./register-controller";
import { requestResetPasswordTokens } from "./request-reset-password-controller";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/sessions", authenticate);
  app.post("/reset-password/request", requestResetPasswordTokens);

  /* Authenticated */
  app.get("/users", { onRequest: [verifyJWT] }, fetchUsers);
  app.get("/me", { onRequest: [verifyJWT] }, profile);
}
