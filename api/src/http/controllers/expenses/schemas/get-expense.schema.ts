import { firstDayMonth, today } from "@/lib/date-current";
import z from "zod";

export const getExpenseQuerySchema = z.object({
  expense: z.string().optional().meta({ example: "pães" }),
  category: z.string().optional().meta({ example: "alimentação" }),
  from: z.coerce.date().optional().meta({ example: firstDayMonth }),
  to: z.coerce.date().optional().meta({ example: today }),
  pageIndex: z.coerce.number().meta({ example: 0 }),
});

export const getExpenseResponseSchema = {
  200: z
    .object({
      expenses: z.array(
        z.object({
          id: z
            .string()
            .meta({ example: "01a131f5-d211-76fb-a1eb-14c9d2af3651" }),
          title: z.string().meta({ example: "pães" }),
          description: z.string().nullable().meta({ example: "pães frescos." }),
          created_at: z.date().meta({ example: "2026-10-12T21:12:36.113Z" }),
          user_id: z
            .string()
            .meta({ example: "019ff822-f98c-75a9-a4ae-ffead3c49987" }),
          enterprise: z.string().meta({ example: "Padaria Bela Vista" }),
          cnpj: z.string().nullable().meta({ example: "12.345.678/0001-99" }),
          source: z
            .string()
            .nullable()
            .meta({ example: "Embu das Artes / São Paulo" }),
          price: z.number().meta({ example: 8.5 }),
          card_last_digits: z.string().meta({ example: "4108" }),
          category_id: z
            .string()
            .meta({ example: "01a12dd6-dc15-742e-8e18-2c46820112bf" }),
        }),
      ),
      meta: z.object({
        pageIndex: z.number(),
        perPage: z.number().meta({ example: 10 }),
        totalCount: z.number(),
        totalPages: z.number(),
      }),
    })
    .describe("Fetch expenses."),
  404: z
    .object({
      message: z.string().meta({ example: "User not found." }),
    })
    .describe("User not found, occurs when not authenticate in API."),
};
