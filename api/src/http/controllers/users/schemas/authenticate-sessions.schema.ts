import z from "zod";

export const authenticateSessionsBodySchema = z.object({
  email: z.email().meta({ example: "email@example.com" }),
  password: z.string().min(6).max(22).meta({ example: "a_secure_password" }),
});

export const authenticateSessionsResponseSchema = {
  200: z
    .object({
      token: z.string().meta({
        example: "asdasqwewe1232423rwefsdcsdcs32423423ewqewd23",
      }),
    })
    .describe("Session token."),
  400: z
    .object({
      message: z.string().meta({ example: "Invalid credentials." }),
    })
    .describe("Invalid credentials."),
};
