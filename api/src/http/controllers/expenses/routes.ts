import { FastifyInstance } from "fastify";

import { rateLimiter } from "@/http/middlewares/rate-limiter";
import { verifyJWT } from "@/http/middlewares/verify-jwt";

import { deleteExpense } from "./delete-controller";
import { fetchExpenses } from "./fetch-user-expenses-history-controller";
import { getMeticsUser } from "./get-user-metrics-controller";
import { register } from "./register-controller";
import z from "zod";

export async function expensesRoutes(app: FastifyInstance) {
  /* Authenticated */
  app.get(
    "/expenses",
    {
      preHandler: [verifyJWT, rateLimiter],
      schema: {
        tags: ["expenses"],
        description: "List expenses",
        query: z.object({
          query: z.string().optional().nullable(),
          page: z.coerce.number().default(1),
        }),
        response: {
          200: z
            .object({
              expenses: z.array(
                z.object({
                  title: z.string(),
                  description: z.string().nullable(),
                  id: z.string(),
                  created_at: z.date(),
                  user_id: z.string(),
                  enterprise: z.string(),
                  cnpj: z.string().nullable(),
                  source: z.string().nullable(),
                  price: z.number(),
                  card_last_digits: z.string(),
                  category_id: z.string(),
                }),
              ),
              meta: z.object({
                page: z.number(),
                perPage: z.number(),
                totalCount: z.number(),
                totalPages: z.number(),
              }),
            })
            .describe("Fetch expenses."),
          404: z
            .object({
              message: z.string(),
            })
            .describe("User not found."),
        },
      },
    },
    fetchExpenses,
  );

  app.get(
    "/metrics",
    {
      preHandler: [verifyJWT, rateLimiter],
      schema: {
        tags: ["expenses"],
        description: "List metrics user",
        query: z.object({
          from: z.string().optional(),
          to: z.string().optional(),
        }),
        response: {
          200: z
            .object({
              count_expenses_day: z.number(),
              total_expenses_day: z.number(),
              count_expenses_month: z.number(),
              total_expenses_month: z.number(),
            })
            .describe("Get metrics from user."),
          404: z
            .object({
              message: z.string(),
            })
            .describe("User not found."),
        },
      },
    },
    getMeticsUser,
  );

  app.post(
    "/expenses",
    {
      preHandler: [verifyJWT, rateLimiter],
      schema: {
        tags: ["expenses"],
        description: "List metrics user",
        body: z.object({
          title: z.string(),
          enterprise: z.string(),
          description: z.string().nullable().optional().default(null),
          cnpj: z.string().nullable().optional().default(null),
          source: z.string().nullable().optional().default(null),
          price: z.coerce.number(),
          card_last_digits: z.string().min(1).max(4),
          category_id: z.string(),
        }),
        response: {
          201: z.null().describe("Create new a expense."),
          404: z
            .object({
              message: z.string(),
            })
            .describe("User or category not found."),
        },
      },
    },
    register,
  );

  app.delete(
    "/expenses",
    {
      preHandler: [verifyJWT, rateLimiter],
      schema: {
        tags: ["expenses"],
        description: "List metrics user",
        body: z.object({
          title: z.string(),
          enterprise: z.string(),
          description: z.string().nullable().optional().default(null),
          cnpj: z.string().nullable().optional().default(null),
          source: z.string().nullable().optional().default(null),
          price: z.coerce.number(),
          card_last_digits: z.string().min(1).max(4),
          category_id: z.string(),
        }),
        response: {
          201: z.null().describe("Delete a expense."),
          404: z
            .object({
              message: z.string(),
            })
            .describe("Expense not found."),
          401: z
            .object({
              message: z.string(),
            })
            .describe("Not authorized."),
        },
      },
    },
    deleteExpense,
  );
}
