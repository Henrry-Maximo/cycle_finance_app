import { env } from "@/env";
import z from "zod";

export const postResetPasswordRequestBodySchema = z.object({
  email: z.email().meta({ example: "email@example.com" }),
});

export const postResetPasswordRequestResponseSchema = {
  200: z
    .object({
      url: z.string().meta({
        example: `${env.APP_URL}/reset-password?token=eyJhbGciOiJIUzI...`,
      }),
    })
    .describe("URL for reset password."),
  404: z
    .object({
      message: z.string().meta({ example: "Resource not found." }),
    })
    .describe("Resource not found."),
};
