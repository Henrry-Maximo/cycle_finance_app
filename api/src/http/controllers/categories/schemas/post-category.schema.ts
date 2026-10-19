import z from "zod";

export const postCategoryBodySchema = z.object({
  title: z.string().meta({ example: "Alimentação" }),
  description: z.string().meta({ example: "Custo com pães e derivados." }),
});

export const postCategoryResponseSchema = {
  201: z.object({}).meta({ example: {} }).describe("Category created."),
  404: z
    .object({
      message: z.string().meta({
        example: "User not found.",
      }),
    })
    .describe("User not found."),
  429: z
    .object({
      message: z.string().meta({ example: "Category limit reached." }),
    })
    .describe("Category limit reached."),
  409: z
    .object({
      message: z.string().meta({
        example: "Category already exists.",
      }),
    })
    .describe("Category already exists."),
};
