import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middlewares/verify-jwt";

import { fetchCategories } from "./fetch-controller";
import { register } from "./register-controller";

export async function categoriesRoutes(app: FastifyInstance) {
  /* Authenticated */
  app.get("/categories", { onRequest: [verifyJWT] }, fetchCategories);
  app.post("/categories", { onRequest: [verifyJWT] }, register);
}
