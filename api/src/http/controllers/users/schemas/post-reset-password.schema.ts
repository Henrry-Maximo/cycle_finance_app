import z from "zod";

export const postResetPasswordQuerySchema = z.object({
  token: z.string().meta({ example: "eyJhbGciOiJIUzI..." }),
});

export const postResetPasswordBodySchema = z.object({
  password: z
    .string()
    .min(6)
    .max(22)
    .meta({ example: "a_new_secure_password" }),
});

export const postResetPasswordResponseSchema = {
  200: z
    .object()
    .meta({
      example: {},
    })
    .describe("Password updated."),
  404: z
    .object({
      message: z.string().meta({ example: "Resource not found." }),
    })
    .describe("Rosource not found."),
  401: z
    .object({
      message: z.string().meta({ example: "Reset password token invalid." }),
    })
    .describe("Reset password token invalid."),
  422: z.object({
    messge: z.string().meta({ example: "Reusing passwords is not allowed." }),
  }),
};
