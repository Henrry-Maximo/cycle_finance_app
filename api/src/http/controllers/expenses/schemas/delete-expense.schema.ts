import z from "zod";

export const deleteExpenseParamsSchema = z.object({
  id: z.string().meta({ example: "01a131f5-d211..." }),
});

export const deleteExpenseResponseSchema = {
  204: z.object({}).describe("An expense was deleted.").meta({ example: {} }),
  404: z
    .object({
      message: z.string().meta({ example: "Expense not found." }),
    })
    .describe("Expense not found."),
  401: z
    .object({
      message: z.string().meta({ example: "Not authorized." }),
    })
    .describe("Not authorized."),
};
