import { categoriesRoutes } from "./controllers/categories/routes";
import { expensesRoutes } from "./controllers/expenses/routes";
import { usersRoutes } from "./controllers/users/routes";
import { FastifyTypedInstance } from "@/types";

export async function appRoutes(app: FastifyTypedInstance) {
  app.register(usersRoutes);
  app.register(expensesRoutes);
  app.register(categoriesRoutes);
}
