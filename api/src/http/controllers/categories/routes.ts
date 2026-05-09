import { FastifyInstance } from "fastify";
import { fetchUserCategoriesHistory } from "./fetch-controller";
import { registerCategories } from "./register-controller";

export async function categoriesRoutes(app: FastifyInstance) {
  app.get("/categories", fetchUserCategoriesHistory);

  app.post("/categories", registerCategories);
}
