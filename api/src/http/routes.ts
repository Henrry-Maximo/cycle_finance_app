import { FastifyInstance } from "fastify";
import { usersRoutes } from "./controllers/users/routes";
import { expensesRoutes } from "./controllers/expenses/routes";
import { categoriesRoutes } from "./controllers/categories/routes";

export async function appRoutes(app: FastifyInstance) {
  app.register(usersRoutes);
  app.register(expensesRoutes);
  app.register(categoriesRoutes);
}