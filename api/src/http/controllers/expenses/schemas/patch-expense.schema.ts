import z from "zod";

export const patchExpenseBodySchema = z.object({
  title: z.string().meta({ example: "pães" }),
  enterprise: z.string().meta({ example: "mercado ceifa" }),
  description: z.string().meta({ example: "pães frescos." }),
  cnpj: z.string().meta({ example: "12.345.678/0001-99" }),
  source: z.string().meta({ example: "Embu das Artes / São Paulo" }),
  price: z.number().meta({ example: 10.52 }),
  card_last_digits: z.string().meta({ example: "4108" }),
});
