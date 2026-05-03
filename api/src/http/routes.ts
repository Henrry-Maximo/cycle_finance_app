import { FastifyInstance } from "fastify";

import { registerUsers } from "./controllers/users/register-controller";
import { registerCategories } from "./controllers/categories/register-controller";
import { registerExpenses } from "./controllers/expenses/register-controller";
import { getUsers } from "./controllers/users/get-controller";
import { getExpenses } from "./controllers/expenses/get-controller";
import { getCategories } from "./controllers/categories/get-controller";
import { authenticate } from "./controllers/users/authenticate-controller";

export async function appRoutes(app: FastifyInstance) {
  app.post("/sessions", authenticate)

  app.get("/users", getUsers);
  app.get("/expenses", getExpenses);
  app.get("/categories", getCategories);

  app.post("/users", registerUsers);
  app.post("/expenses", registerExpenses);
  app.post("/categories", registerCategories);
}