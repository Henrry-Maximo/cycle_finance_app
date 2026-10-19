import z from "zod";

export const patchProfileBodySchema = z.object({
  username: z.string().meta({ example: "johndoe" }),
  email: z.email().meta({ example: "example@gmail.com" }),
});

export const patchProfileResponseSchema = {
  200: z
    .object({
      username: z.string().meta({ example: "johndoe" }),
      email: z.string().meta({ example: "email@example.com" }),
    })
    .describe("Profile update with successful."),
  404: z
    .object({
      message: z.string().meta({ example: "Resource not found." }),
    })
    .describe("Resource not found."),
};
