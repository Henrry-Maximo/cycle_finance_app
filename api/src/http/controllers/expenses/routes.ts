import { FastifyInstance } from "fastify";

import { rateLimiter } from "@/http/middlewares/rate-limiter";
import { verifyJWT } from "@/http/middlewares/verify-jwt";

import { analyzeReceiptController } from "./analyze-receipt-controller";
import { deleteExpense } from "./delete-controller";
import { fetchExpensesGroupedByDate } from "./fetch-expenses-grouped-by-date-controller";
import { fetchExpenses } from "./fetch-user-expenses-history-controller";
import { getMeticsUser } from "./get-user-metrics-controller";
import { register } from "./register-controller";
import { update } from "./update-controller";
import {
  registerExpenseBodySchema,
  registerExpenseResponseSchema,
} from "./schemas/register-expense.schema";
import {
  patchExpenseBodySchema,
  patchExpenseResponseSchema,
  updateExpensesQuerySchema,
} from "./schemas/patch-expense.schema";
import {
  getExpenseQuerySchema,
  getExpenseResponseSchema,
} from "./schemas/get-expense.schema";
import {
  getExpensePeriodQuerySchema,
  getExpensePeriodResponseSchema,
} from "./schemas/get-expense-period.schema";
import {
  postExpenseAnalyzeBodySchema,
  postExpenseAnalyzeResponseSchema,
} from "./schemas/post-expenses-analyze.schema";
import {
  getExpenseMetricsQuerySchema,
  getExpenseMetricsResponseSchema,
} from "./schemas/get-expense-metrics.schema";
import {
  deleteExpenseQuerySchema,
  deleteExpenseResponseSchema,
} from "./schemas/delete-expense.schema";

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
        description:
          "Returns a paginated list of all expenses for the authenticated user. Supports optional filters: `expense` (name), `category` (name), `from` and `to` (date range). Defaults to **15 items per page**.",
        query: getExpenseQuerySchema,
        response: getExpenseResponseSchema,
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
        description:
          "Returns aggregated metrics for the authenticated user: total and count of expenses for the **current day** and **current month**. Supports optional `from` and `to` date filters.",
        query: getExpenseMetricsQuerySchema,
        response: getExpenseMetricsResponseSchema,
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
        description:
          "Returns expenses aggregated by date with the total amount per day. Useful for rendering time-series charts. Supports optional `from` and `to` date filters.",
        query: getExpensePeriodQuerySchema,
        response: getExpensePeriodResponseSchema,
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
        description:
          "Creates a new expense linked to the authenticated user and a valid category owned by them. Returns `404` if the user or category is not found.",
        body: registerExpenseBodySchema,
        response: registerExpenseResponseSchema,
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
        description:
          "Uploads a receipt image (`JPEG` or `PNG`, max **5MB**) and uses **Gemini AI** to extract expense data such as title, amount, date, and category suggestions.",
        consumes: ["multipart/form-data"],
        body: postExpenseAnalyzeBodySchema,
        response: postExpenseAnalyzeResponseSchema,
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
        description:
          "Updates an existing expense identified by the `id` query parameter. Only the owner of the expense can perform this action. Returns `409` if the category is already in use by the expense.",
        query: updateExpensesQuerySchema,
        body: patchExpenseBodySchema,
        response: patchExpenseResponseSchema,
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
        description:
          "Permanently deletes an expense identified by the `id` query parameter. Only the owner of the expense can perform this action. Returns `401` if the expense belongs to another user.",
        query: deleteExpenseQuerySchema,
        response: deleteExpenseResponseSchema,
      },
    },
    deleteExpense,
  );
}
