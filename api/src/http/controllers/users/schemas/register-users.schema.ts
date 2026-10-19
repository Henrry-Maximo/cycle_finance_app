import z from "zod";

export const registerUsersBodySchema = z.object({
  username: z.string().max(38).meta({ example: "johndoe" }),
  email: z.email().meta({ example: "email@example.com" }),
  password: z.string().min(6).max(22).meta({ example: "a_secure_password" }),
});

export const registerUsersResponseSchema = {
  201: z.null().describe("User created.").meta({
    example: {},
  }),
  409: z
    .object({
      message: z.string(),
    })
    .describe("E-mail already exists.")
    .meta({
      example: { message: "E-mail already exists." },
    }),
};
