import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middlewares/verify-jwt";

import { deleteExpense } from "./delete-controller";
import { fetchExpenses } from "./fetch-user-expenses-history-controller";
import { getMeticsUser } from "./get-user-metrics-controller";
import { register } from "./register-controller";

export async function expensesRoutes(app: FastifyInstance) {
  /* Authenticated */
  app.get("/expenses", { preHandler: [verifyJWT] }, fetchExpenses);
  app.get("/metrics", { preHandler: [verifyJWT] }, getMeticsUser);
  app.post("/expenses", { preHandler: [verifyJWT] }, register);
  app.delete("/expenses", { preHandler: [verifyJWT] }, deleteExpense);
}
