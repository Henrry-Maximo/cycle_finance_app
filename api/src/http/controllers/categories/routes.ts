import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middlewares/verify-jwt";

import { fetchCategories } from "./fetch-controller";
import { register } from "./register-controller";
import { deleteCategory } from "./delete-controller";

export async function categoriesRoutes(app: FastifyInstance) {
  /* Authenticated */
  app.get("/categories", { preHandler: [verifyJWT] }, fetchCategories);
  app.post("/categories", { preHandler: [verifyJWT] }, register);
  app.delete("/categories", { preHandler: [verifyJWT] }, deleteCategory);
}
