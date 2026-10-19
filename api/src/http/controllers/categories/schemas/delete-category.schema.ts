import z from "zod";

export const deleteCategoryQuerySchema = z.object({
  id: z.string().meta({ example: "01a131f5-d211..." }),
});

export const deleteCategoryResponseSchema = {
  204: z.object().meta({ example: {} }).describe("An delete was category."),
  404: z
    .object({
      message: z.string().meta({ example: "Category not found." }),
    })
    .describe("Category not found."),
  401: z
    .object({
      message: z.string().meta({ example: "Not authorized." }),
    })
    .describe("Not authorized."),
  409: z
    .object({
      message: z.string().meta({ example: "Category already in use." }),
    })
    .describe("Category already in use."),
};
