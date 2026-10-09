import { FastifyInstance } from "fastify";
import z from "zod";

import { rateLimiter } from "@/http/middlewares/rate-limiter";
import { verifyJWT } from "@/http/middlewares/verify-jwt";

import { deleteCategory } from "./delete-controller";
import { fetchCategoriesGroupedByTotal } from "./fetch-categories-grouped-by-total-controller";
import { fetchCategories } from "./fetch-controller";
import { register } from "./register-controller";
import { update } from "./update-controller";

export async function categoriesRoutes(app: FastifyInstance) {
  /* Authenticated */
  app.get(
    "/categories",
    {
      preHandler: [verifyJWT, rateLimiter],
      schema: {
        security: [
          {
            bearerAuth: [],
          },
        ],
        tags: ["Categories"],
        summary: "List user categories",
        description: "Returns a paginated list of all categories owned by the authenticated user. Supports optional `query` filter by name. Defaults to **15 items per page**.",
        query: z.object({
          query: z.string().optional().nullable(),
          page: z.coerce.number().default(1),
        }),
        response: {
          200: z.object({
            categories: z.array(
              z.object({
                id: z.string(),
                title: z.string(),
                description: z.string().nullable(),
                created_at: z.date(),
                user_id: z.string(),
              }),
            ),
          }),
          404: z
            .object({
              message: z.string(),
            })
            .describe("User not found."),
        },
      },
    },
    fetchCategories,
  );

  app.post(
    "/categories",
    {
      preHandler: [verifyJWT, rateLimiter],
      schema: {
        security: [
          {
            bearerAuth: [],
          },
        ],
        tags: ["Categories"],
        summary: "Register a new category",
        description: "Creates a new expense category for the authenticated user. Each user is limited to **15 categories**. Returns `409` if a category with the same title already exists, and `429` if the limit has been reached.",
        body: z.object({
          title: z.string(),
          description: z.string(),
        }),
        response: {
          201: z.null().describe("Category created."),
          404: z
            .object({
              message: z.string(),
            })
            .describe("User not found."),
          429: z
            .object({
              message: z.string(),
            })
            .describe("Category limit reached."),
          409: z
            .object({
              message: z.string(),
            })
            .describe("Category already exists."),
        },
      },
    },
    register,
  );

  app.get(
    "/categories/period",
    {
      preHandler: [verifyJWT, rateLimiter],
      schema: {
        security: [
          {
            bearerAuth: [],
          },
        ],
        tags: ["Categories"],
        summary: "List categories grouped by total",
        description: "Returns all categories for the authenticated user aggregated with the total amount spent and the number of expenses per category. Useful for rendering category distribution charts.",
        response: {
          200: z
            .array(
              z.object({
                name: z.string(),
                count: z.number(),
                total: z.number(),
              }),
            )
            .describe("Fetch categories grouped by total from user."),
          404: z
            .object({
              message: z.string(),
            })
            .describe("User not found."),
        },
      },
    },
    fetchCategoriesGroupedByTotal,
  );

  app.delete(
    "/categories",
    {
      preHandler: [verifyJWT, rateLimiter],
      schema: {
        security: [
          {
            bearerAuth: [],
          },
        ],
        tags: ["Categories"],
        summary: "Delete a category",
        description: "Permanently deletes a category identified by the `id` query parameter. Only the owner can delete it. Returns `401` if the category belongs to another user. **Cannot delete a category that has expenses linked to it.**",
        query: z.object({
          id: z.string(),
        }),
        response: {
          200: z.object({
            categories: z.array(
              z.object({
                id: z.string(),
                title: z.string(),
                description: z.string().nullable(),
                created_at: z.date(),
                user_id: z.string(),
              }),
            ),
          }),
          201: z.null().describe("Delete a category."),
          404: z
            .object({
              message: z.string(),
            })
            .describe("Category not found."),
          401: z
            .object({
              message: z.string(),
            })
            .describe("Not authorized."),
        },
      },
    },
    deleteCategory,
  );

  app.patch(
    "/categories",
    {
      preHandler: [verifyJWT, rateLimiter],
      schema: {
        security: [
          {
            bearerAuth: [],
          },
        ],
        tags: ["Categories"],
        summary: "Update a category",
        description: "Updates the title or description of an existing category. Only the owner of the category can perform this action.",
        response: {
          200: z
            .object({
              title: z.string().nullable(),
              description: z.string().nullable().nullable(),
            })
            .describe("Category update with successful."),
          404: z
            .object({
              message: z.string(),
            })
            .describe("Rosource not found."),
        },
      },
    },
    update,
  );
}
