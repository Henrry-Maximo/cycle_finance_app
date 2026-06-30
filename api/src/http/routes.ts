import { categoriesRoutes } from "./controllers/categories/routes";
import { expensesRoutes } from "./controllers/expenses/routes";
import { usersRoutes } from "./controllers/users/routes";
import { FastifyTypedInstance } from "@/types";
import { audit } from "./middlewares/audit";

export async function appRoutes(app: FastifyTypedInstance) {
  app.addHook("onResponse", audit);

  app.register(usersRoutes);
  app.register(expensesRoutes);
  app.register(categoriesRoutes);
}
