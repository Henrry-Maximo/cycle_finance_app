import { FastifyInstance } from "fastify";

import { rateLimiter } from "@/http/middlewares/rate-limiter";
import { verifyJWT } from "@/http/middlewares/verify-jwt";

import { deleteExpense } from "./delete-controller";
import { fetchExpenses } from "./fetch-user-expenses-history-controller";
import { getMeticsUser } from "./get-user-metrics-controller";
import { register } from "./register-controller";

export async function expensesRoutes(app: FastifyInstance) {
  /* Authenticated */
  app.get("/expenses", { preHandler: [verifyJWT, rateLimiter] }, fetchExpenses);
  app.get("/metrics", { preHandler: [verifyJWT, rateLimiter] }, getMeticsUser);
  app.post("/expenses", { preHandler: [verifyJWT, rateLimiter] }, register);
  app.delete(
    "/expenses",
    { preHandler: [verifyJWT, rateLimiter] },
    deleteExpense,
  );
}
