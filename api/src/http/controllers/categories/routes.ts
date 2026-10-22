import { FastifyInstance } from "fastify";

import { rateLimiter } from "@/http/middlewares/rate-limiter";
import { verifyJWT } from "@/http/middlewares/verify-jwt";

import { deleteCategory } from "./delete-controller";
import { fetchCategoriesGroupedByTotal } from "./fetch-categories-grouped-by-total-controller";
import { fetchCategories } from "./fetch-controller";
import { register } from "./register-controller";
import { update } from "./update-controller";
import {
  getCategoryQuerySchema,
  getCategoryResponseSchema,
} from "./schemas/get-category.schema";
import {
  postCategoryBodySchema,
  postCategoryResponseSchema,
} from "./schemas/post-category.schema";
import {
  deleteCategoryParamsSchema,
  deleteCategoryResponseSchema,
} from "./schemas/delete-category.schema";
import {
  patchCategoryBodySchema,
  patchCategoryParamsSchema,
  patchCategoryResponseSchema,
} from "./schemas/patch-category.schema";
import { getCategoriesPeriodResponseSchema } from "./schemas/get-categories-period.schema";

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
        response: getCategoryResponseSchema,
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
        response: postCategoryResponseSchema,
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
        response: getCategoriesPeriodResponseSchema,
      },
    },
    fetchCategoriesGroupedByTotal,
  );

  app.delete(
    "/categories/:id",
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
        params: deleteCategoryParamsSchema,
        response: deleteCategoryResponseSchema,
      },
    },
    deleteCategory,
  );

  app.patch(
    "/categories/:id",
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
        params: patchCategoryParamsSchema,
        body: patchCategoryBodySchema,
        response: patchCategoryResponseSchema,
      },
    },
    update,
  );
}
