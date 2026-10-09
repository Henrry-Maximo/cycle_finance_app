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
        tags: ["Expenses"],
        summary: "List user expenses",
        description: "Returns a paginated list of all expenses for the authenticated user. Supports optional filters: `expense` (name), `category` (name), `from` and `to` (date range). Defaults to **15 items per page**.",
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
          pageIndex: z.coerce.number().optional(),
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
                pageIndex: z.number(),
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
    "/expenses/metrics",
    {
      preHandler: [verifyJWT, rateLimiter],
      schema: {
        security: [
          {
            bearerAuth: [],
          },
        ],
        tags: ["Expenses"],
        summary: "Get expense metrics",
        description: "Returns aggregated metrics for the authenticated user: total and count of expenses for the **current day** and **current month**. Supports optional `from` and `to` date filters.",
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
        tags: ["Expenses"],
        summary: "List expenses grouped by date",
        description: "Returns expenses aggregated by date with the total amount per day. Useful for rendering time-series charts. Supports optional `from` and `to` date filters.",
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
        tags: ["Expenses"],
        summary: "Register a new expense",
        description: "Creates a new expense linked to the authenticated user and a valid category owned by them. Returns `404` if the user or category is not found.",
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
        tags: ["Expenses"],
        summary: "Analyze a receipt image",
        description: "Uploads a receipt image (`JPEG` or `PNG`, max **5MB**) and uses **Gemini AI** to extract expense data such as title, amount, date, and category suggestions.",
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
        tags: ["Expenses"],
        summary: "Update an expense",
        description: "Updates an existing expense identified by the `id` query parameter. Only the owner of the expense can perform this action. Returns `409` if the category is already in use by the expense.",
        query: z.object({
          id: z.string(),
        }),
        body: z.object({
          title: z.string(),
          enterprise: z.string(),
          description: z.string(),
          cnpj: z.string(),
          source: z.string(),
          price: z.number(),
          card_last_digits: z.string(),
        }),
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
        tags: ["Expenses"],
        summary: "Delete an expense",
        description: "Permanently deletes an expense identified by the `id` query parameter. Only the owner of the expense can perform this action. Returns `401` if the expense belongs to another user.",
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
