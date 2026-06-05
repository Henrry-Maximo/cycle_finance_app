import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middlewares/verify-jwt";

import { deleteExpense } from "./delete-controller";
import { fetchExpenses } from "./fetch-user-expenses-history-controller";
import { getMeticsUser } from "./get-user-metrics-controller";
import { register } from "./register-controller";

export async function expensesRoutes(app: FastifyInstance) {
  /* Authenticated */
  app.get("/expenses", { onRequest: [verifyJWT] }, fetchExpenses);
  app.get("/metrics", { onRequest: [verifyJWT] }, getMeticsUser);
  app.post("/expenses", { onRequest: [verifyJWT] }, register);
  app.delete("/expenses", { onRequest: [verifyJWT] }, deleteExpense);
}
