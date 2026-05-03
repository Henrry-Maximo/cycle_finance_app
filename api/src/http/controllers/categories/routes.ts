import { FastifyInstance } from "fastify";
import { getCategories } from "./get-controller";
import { registerCategories } from "./register-controller";

export async function categoriesRoutes(app: FastifyInstance) {
  app.get("/categories", getCategories);

  app.post("/categories", registerCategories);
}
