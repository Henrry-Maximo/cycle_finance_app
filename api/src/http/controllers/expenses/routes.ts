import { FastifyInstance } from "fastify";
import z from "zod";

import { rateLimiter } from "@/http/middlewares/rate-limiter";
import { verifyJWT } from "@/http/middlewares/verify-jwt";

import { analyzeReceiptController } from "./analyze-receipt-controller";
import { deleteExpense } from "./delete-controller";
import { fetchExpensesGroupedByDate } from "./fetch-expenses-grouped-by-date-controller";
import { fetchExpenses } from "./fetch-user-expenses-history-controller";
import { getMeticsUser } from "./get-user-metrics-controller";
import { register } from "./register-controller";
import { update } from "./update-controller";

export async function expensesRoutes(app: FastifyInstance) {
  /* Authenticated */
  app.get(
    "/expenses",
    {
      preHandler: [verifyJWT, rateLimiter],
      schema: {
        security: [
          {
            bearerAuth: [],
          },
        ],
        tags: ["expenses"],
        description: "List expenses",
        query: z.object({
          expense: z.string().optional(),
          category: z.string().optional(),
          from: z
            .string()
            .optional()
            .transform((val) => (val ? new Date(val) : undefined)),
          to: z
            .string()
            .optional()
            .transform((val) => (val ? new Date(val) : undefined)),
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
        security: [
          {
            bearerAuth: [],
          },
        ],
        tags: ["expenses"],
        description: "List metrics from user",
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

  app.get(
    "/expenses/period",
    {
      preHandler: [verifyJWT, rateLimiter],
      schema: {
        security: [
          {
            bearerAuth: [],
          },
        ],
        tags: ["expenses"],
        description: "List expenses grouped by date from user",
        query: z.object({
          from: z.string().optional(),
          to: z.string().optional(),
        }),
        response: {
          200: z
            .object({
              expenses: z.array(
                z.object({
                  date: z.string(),
                  value: z.number(),
                }),
              ),
            })
            .describe("Fetch expenses grouped by date from user."),
          404: z
            .object({
              message: z.string(),
            })
            .describe("User not found."),
        },
      },
    },
    fetchExpensesGroupedByDate,
  );

  app.post(
    "/expenses",
    {
      preHandler: [verifyJWT, rateLimiter],
      schema: {
        security: [
          {
            bearerAuth: [],
          },
        ],
        tags: ["expenses"],
        description: "Create a new expense",
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

  app.post(
    "/expenses/analyze",
    {
      preHandler: [verifyJWT, rateLimiter],
      schema: {
        security: [
          {
            bearerAuth: [],
          },
        ],
        tags: ["expenses"],
        description:
          "Envia a imagem de um comprovante fiscal para extração inteligente de dados com o Gemini.",
        consumes: ["multipart/form-data"],
        // response: {
        //   200: {
        //     type: "object",
        //     required: ["suggestions"],
        //     properties: {
        //       suggestions: {
        //         type: "object",
        //         required: ["title", "amount", "date", "category"],
        //         properties: {
        //           title: { type: "string" },
        //           amount: { type: "number" },
        //           date: { type: "string" },
        //           category: { type: "string" },
        //         },
        //       },
        //     },
        //   },
        //   400: {
        //     type: "object",
        //     properties: {
        //       message: { type: "string" },
        //     },
        //   },
        // },
      },
    },
    analyzeReceiptController,
  );

  app.patch(
    "/expenses",
    {
      preHandler: [verifyJWT, rateLimiter],
      schema: {
        security: [
          {
            bearerAuth: [],
          },
        ],
        tags: ["expenses"],
        description: "Update expense from user.",
        response: {
          200: z
            .object({
              title: z.string().nullable(),
              enterprise: z.string().nullable(),
              description: z.string().nullable().nullable(),
              cnpj: z.string().nullable().nullable(),
              source: z.string().nullable().nullable(),
              price: z.coerce.number().nullable(),
              card_last_digits: z.string().min(1).max(4).nullable(),
              category_id: z.string().nullable(),
            })
            .describe("Expense update with successful."),
          404: z
            .object({
              message: z.string(),
            })
            .describe("Rosource not found."),
          409: z
            .object({
              message: z.string(),
            })
            .describe("Category already in use."),
        },
      },
    },
    update,
  );

  app.delete(
    "/expenses",
    {
      preHandler: [verifyJWT, rateLimiter],
      schema: {
        security: [
          {
            bearerAuth: [],
          },
        ],
        tags: ["expenses"],
        description: "Delete expense from user",
        query: z.object({
          id: z.string(),
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
