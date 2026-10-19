import { FastifyInstance } from "fastify";
import z from "zod";

import { rateLimiter } from "@/http/middlewares/rate-limiter";
import { verifyJWT } from "@/http/middlewares/verify-jwt";

import { deleteCategory } from "./delete-controller";
import { fetchCategoriesGroupedByTotal } from "./fetch-categories-grouped-by-total-controller";
import { fetchCategories } from "./fetch-controller";
import { register } from "./register-controller";
import { update } from "./update-controller";
import { getCategoryQuerySchema } from "./schemas/get-category.schema";
import { postCategoryBodySchema } from "./schemas/post-category.schema";
import { deleteCategoryQuerySchema } from "./schemas/delete-category.schema";
import {
  patchCategoryBodySchema,
  patchCategoryQuerySchema,
} from "./schemas/patch-category.schema";

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
        description:
          "Returns a paginated list of all categories owned by the authenticated user. Supports optional `query` filter by name. Defaults to **15 items per page**.",
        query: getCategoryQuerySchema,
        response: {
          200: z
            .object({
              categories: z.array(
                z.object({
                  id: z.string().meta({ example: "286171c3-85a1..." }),
                  title: z.string().meta({ example: "Alimentação" }),
                  description: z
                    .string()
                    .nullable()
                    .meta({ example: "Custo com pães e derivados." }),
                  created_at: z.date().meta({
                    example: "2023-01-01T12:00:00.000Z",
                  }),
                  user_id: z.string().meta({ example: "355171c3-85a1..." }),
                }),
              ),
            })
            .describe("Fetch categories from user."),
          404: z
            .object({
              message: z.string().meta({
                example: "User not found.",
              }),
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
        description:
          "Creates a new expense category for the authenticated user. Each user is limited to **15 categories**. Returns `409` if a category with the same title already exists, and `429` if the limit has been reached.",
        body: postCategoryBodySchema,
        response: {
          201: z.null().meta({ example: {} }).describe("Category created."),
          404: z
            .object({
              message: z.string().meta({
                example: "User not found.",
              }),
            })
            .describe("User not found."),
          429: z
            .object({
              message: z.string().meta({ example: "Category limit reached." }),
            })
            .describe("Category limit reached."),
          409: z
            .object({
              message: z.string().meta({
                example: "Category already exists.",
              }),
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
        description:
          "Returns all categories for the authenticated user aggregated with the total amount spent and the number of expenses per category. Useful for rendering category distribution charts.",
        response: {
          200: z
            .array(
              z.object({
                name: z.string().meta({ example: "Alimentação" }),
                count: z.number().meta({ example: 2 }),
                total: z.number().meta({ example: 125.32 }),
              }),
            )
            .describe("Fetch categories grouped by total from user."),
          404: z
            .object({
              message: z.string().meta({ example: "User not found." }),
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
        description:
          "Permanently deletes a category identified by the `id` query parameter. Only the owner can delete it. Returns `401` if the category belongs to another user. **Cannot delete a category that has expenses linked to it.**",
        query: deleteCategoryQuerySchema,
        response: {
          201: z.null().meta({ example: {} }).describe("Delete a category."),
          404: z
            .object({
              message: z.string().meta({ example: "Category not found." }),
            })
            .describe("Category not found."),
          401: z
            .object({
              message: z.string().meta({ example: "Not authorized." }),
            })
            .describe("Not authorized."),
          409: z
            .object({
              message: z.string().meta({ example: "Category already in use." }),
            })
            .describe("Category already in use."),
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
        description:
          "Updates the title or description of an existing category. Only the owner of the category can perform this action.",
        query: patchCategoryQuerySchema,
        body: patchCategoryBodySchema,
        response: {
          200: z
            .object({
              title: z.string().nullable().meta({ example: "Alimentação" }),
              description: z
                .string()
                .nullable()
                .meta({ example: "Custo com pães e derivados." }),
            })
            .describe("Category update with successful."),
          404: z
            .object({
              message: z.string().meta({ example: "Resource not found." }),
            })
            .describe("Resource not found."),
        },
      },
    },
    update,
  );
}
