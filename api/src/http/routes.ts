import { FastifyInstance } from "fastify";

import { categoriesRoutes } from "./controllers/categories/routes";
import { expensesRoutes } from "./controllers/expenses/routes";
import { usersRoutes } from "./controllers/users/routes";

export async function appRoutes(app: FastifyInstance) {
  app.register(usersRoutes);
  app.register(expensesRoutes);
  app.register(categoriesRoutes);
}
