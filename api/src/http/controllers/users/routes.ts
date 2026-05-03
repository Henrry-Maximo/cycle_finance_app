import { FastifyInstance } from "fastify";
import { getUsers } from "./get-controller";
import { registerUsers } from "./register-controller";
import { getUserProfile } from "./get-user-profile";
import { authenticate } from "./authenticate-controller";

export async function usersRoutes(app: FastifyInstance) {
  app.get("/users", getUsers);

  app.post("/users", registerUsers);
  app.post("/user/profile", getUserProfile);
  app.post("/sessions", authenticate);
}
