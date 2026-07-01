import { FastifyInstance } from "fastify";

import { rateLimiter } from "@/http/middlewares/rate-limiter";
import { verifyJWT } from "@/http/middlewares/verify-jwt";

import { deleteCategory } from "./delete-controller";
import { fetchCategories } from "./fetch-controller";
import { register } from "./register-controller";
import z from "zod";

export async function categoriesRoutes(app: FastifyInstance) {
  /* Authenticated */
  app.get(
    "/categories",
    {
      preHandler: [verifyJWT, rateLimiter],
      schema: {
        tags: ["categories"],
        description: "List categories",
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
        tags: ["categories"],
        description: "Create a new category",
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

  app.delete(
    "/categories",
    {
      preHandler: [verifyJWT, rateLimiter],
      schema: {
        tags: ["categories"],
        description: "Delete category from user",
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
}
