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
