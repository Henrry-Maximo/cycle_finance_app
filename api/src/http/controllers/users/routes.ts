import { FastifyInstance } from "fastify";
import { fetchUsers } from "./fetch-users-controller";
import { register } from "./register-controller";
import { profile } from "./profile-controller";
import { authenticate } from "./authenticate-controller";
import { verifyJWT } from "@/http/middlewares/verify-jwt";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/sessions", authenticate);

  /* Authenticated */
  app.get("/users", { onRequest: [verifyJWT] }, fetchUsers);
  app.post("/me", { onRequest: [verifyJWT] }, profile);
}
