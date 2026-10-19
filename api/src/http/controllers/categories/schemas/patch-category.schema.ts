import z from "zod";

export const patchCategoryQuerySchema = z.object({
  id: z.string().meta({ example: "01a131f5-d211..." }),
});

export const patchCategoryBodySchema = z.object({
  title: z.string().nullable().default(null).meta({ example: "Alimentação" }),
  description: z
    .string()
    .nullable()
    .default(null)
    .meta({ example: "Categoria para..." }),
});

export const patchCategoryResponseSchema = {
  200: z
    .object({
      title: z.string().nullable().meta({ example: "Alimentação" }),
      description: z
        .string()
        .nullable()
        .meta({ example: "Custo com pães e derivados." }),
    })
    .describe("Category update with successful."),
  404: z
    .object({
      message: z.string().meta({ example: "Resource not found." }),
    })
    .describe("Resource not found."),
};
