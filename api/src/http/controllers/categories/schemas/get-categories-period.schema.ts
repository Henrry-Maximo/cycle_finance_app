import z from "zod";

export const getCategoriesPeriodResponseSchema = {
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
};
