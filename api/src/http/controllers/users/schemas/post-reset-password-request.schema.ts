import { env } from "@/env";
import z from "zod";

export const postResetPasswordRequestBodySchema = z.object({
  email: z.email().meta({ example: "email@example.com" }),
});

export const postResetPasswordRequestResponseSchema = {
  200: z.object({}).meta({ example: {} }).describe("URL for reset password."),
  404: z
    .object({
      message: z.string().meta({ example: "Resource not found." }),
    })
    .describe("Resource not found."),
};
