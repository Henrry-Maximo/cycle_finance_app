import { FastifyInstance } from "fastify";
import { fetchExpenses } from "./fetch-user-expenses-history-controller";
import { register } from "./register-controller";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { getMeticsUser } from "./get-user-metrics-controller";

export async function expensesRoutes(app: FastifyInstance) {
  /* Authenticated */
  app.get("/expenses", { onRequest: [verifyJWT] }, fetchExpenses);
  app.get("/metrics", { onRequest: [verifyJWT] }, getMeticsUser);
  app.post("/expenses", { onRequest: [verifyJWT] }, register);
}
