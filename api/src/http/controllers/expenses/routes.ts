import { FastifyInstance } from "fastify";
import { fetchUserExpensesHistory } from "./fetch-controller";
import { registerExpenses } from "./register-controller";

export async function expensesRoutes(app: FastifyInstance) {
  app.get("/expenses", fetchUserExpensesHistory);

  app.post("/expenses", registerExpenses);
}
