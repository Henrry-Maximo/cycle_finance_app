import { FastifyInstance } from "fastify";

import { rateLimiter } from "@/http/middlewares/rate-limiter";
import { verifyJWT } from "@/http/middlewares/verify-jwt";

import { deleteCategory } from "./delete-controller";
import { fetchCategories } from "./fetch-controller";
import { register } from "./register-controller";

export async function categoriesRoutes(app: FastifyInstance) {
  /* Authenticated */
  app.get(
    "/categories",
    { preHandler: [verifyJWT, rateLimiter] },
    fetchCategories,
  );
  app.post("/categories", { preHandler: [verifyJWT, rateLimiter] }, register);
  app.delete(
    "/categories",
    { preHandler: [verifyJWT, rateLimiter] },
    deleteCategory,
  );
}
