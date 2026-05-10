import { FastifyInstance } from "fastify";
import { fetchCategories } from "./fetch-controller";
import { register } from "./register-controller";

export async function categoriesRoutes(app: FastifyInstance) {
  /* Authenticated */
  app.get("/categories", fetchCategories);
  app.post("/categories", register);
}
