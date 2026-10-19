import z from "zod";

export const postCategoryBodySchema = z.object({
  title: z.string().meta({ example: "Alimentação" }),
  description: z.string().meta({ example: "Custo com pães e derivados." }),
});
