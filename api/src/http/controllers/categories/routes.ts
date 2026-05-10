import { FastifyInstance } from "fastify";
import { fetchCategories } from "./fetch-controller";
import { register } from "./register-controller";
import { verifyJWT } from "@/http/middlewares/verify-jwt";

export async function categoriesRoutes(app: FastifyInstance) {
  /* Authenticated */
  app.get("/categories", { onRequest: [verifyJWT] }, fetchCategories);
  app.post("/categories", { onRequest: [verifyJWT] }, register);
}
