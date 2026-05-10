import { FastifyInstance } from "fastify";
import { fetchExpenses } from "./fetch-user-expenses-history-controller";
import { register } from "./register-controller";

export async function expensesRoutes(app: FastifyInstance) {
  /* Authenticated */
  app.get("/expenses", fetchExpenses);
  app.post("/expenses", register);
}
