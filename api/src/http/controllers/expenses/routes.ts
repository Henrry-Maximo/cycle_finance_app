import { FastifyInstance } from "fastify";
import { getExpenses } from "./get-controller";
import { registerExpenses } from "./register-controller";

export async function expensesRoutes(app: FastifyInstance) {
  app.get("/expenses", getExpenses);

  app.post("/expenses", registerExpenses);
}
