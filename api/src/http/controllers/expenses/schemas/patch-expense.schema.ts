import z from "zod";

export const updateExpensesParamsSchema = z.object({
  id: z.string().meta({ example: "01a131f5-d211..." }),
});

export const patchExpenseBodySchema = z.object({
  title: z.string().meta({ example: "pães" }),
  enterprise: z.string().meta({ example: "mercado ceifa" }),
  description: z.string().meta({ example: "pães frescos." }),
  cnpj: z.string().meta({ example: "12.345.678/0001-99" }),
  source: z.string().meta({ example: "Embu das Artes / São Paulo" }),
  price: z.number().meta({ example: 10.52 }),
  card_last_digits: z.string().meta({ example: "4108" }),
  category_id: z.string().meta({ example: "01a131f5-d211..." }),
});

export const patchExpenseResponseSchema = {
  200: z
    .object({
      title: z.string().nullable().meta({ example: "pães" }),
      enterprise: z.string().nullable().meta({ example: "mercado ceifa" }),
      description: z.string().nullable().meta({ example: "pães frescos." }),
      cnpj: z
        .string()
        .nullable()
        .nullable()
        .meta({ example: "12.345.678/0001-99" }),
      source: z
        .string()
        .nullable()
        .meta({ example: "Embu das Artes / São Paulo" }),
      price: z.coerce.number().nullable().meta({ example: 10.52 }),
      card_last_digits: z
        .string()
        .min(1)
        .max(4)
        .nullable()
        .meta({ example: "1408" }),
      category_id: z.string().nullable().meta({ example: "01a12dd6-dc15..." }),
    })
    .describe("Expense update with successful."),
  404: z
    .object({
      message: z.string().meta({ example: "Resource not found." }),
    })
    .describe("Resource not found."),
  409: z
    .object({
      message: z.string().meta({ example: "Category already in use." }),
    })
    .describe("Category already in use."),
};
