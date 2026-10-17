import { today } from "@/lib/date-current";
import z from "zod";

export const registerExpenseBodySchema = z.object({
  title: z.string().meta({ example: "pães" }),
  enterprise: z.string().meta({ example: "mercado ceifa" }),
  description: z.string().nullable().meta({ example: "pães frescos." }),
  cnpj: z.string().nullable().meta({ example: "12.345.678/0001-99" }),
  source: z.string().nullable().meta({ example: "Embu das Artes / São Paulo" }),
  price: z.coerce.number().meta({ example: 10.52 }),
  card_last_digits: z.string().min(1).max(4).meta({ example: "4108" }),
  created_at: z.string().optional().meta({ example: today }),
  category_id: z
    .string()
    .meta({ example: "01a12dd6-dc15-742e-8e18-2c46820112bf" }),
});
