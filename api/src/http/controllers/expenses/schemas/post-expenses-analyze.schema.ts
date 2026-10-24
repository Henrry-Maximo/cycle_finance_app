import { today } from "@/lib/date-current";
import z from "zod";

// export const postExpenseAnalyzeBodySchema = z.object({
//   receipt: z
//     .object({
//       buffer: z.instanceof(Buffer),
//       mimetype: z.enum(["image/jpeg", "image/png"]),
//     })
//     .describe("Receipt image file"),
// });

export const postExpenseAnalyzeBodySchema = z.object({
  receipt: z.any().meta({
    type: "string",
    format: "binary",
    description: "Receipt image file (JPEG ou PNG, max 5MB)",
  }),
});

export const postExpenseAnalyzeResponseSchema = {
  200: z
    .object({
      date: z.string().optional().meta({ example: today }),
      store: z.string().optional().meta({ example: "Mercado Ceifa" }),
      cpfOrCNPJ: z.string().optional().meta({ example: "69.034.668/0001-56" }),
      stateOrCity: z
        .string()
        .optional()
        .meta({ example: "São Paulo/Embu das Artes" }),
      amount: z.number().optional().meta({ example: 10.52 }),
      code: z.string().optional().meta({ example: "4102" }),
    })
    .describe("Receipt analyzed with successfully."),
  400: z
    .object({
      message: z.string().meta({ example: "Invalid file type." }),
    })
    .describe("Invalid file type."),
  503: z
    .object({
      message: z.string().meta({ example: "External service unavailable." }),
    })
    .describe("External service unavailable."),
  429: z
    .object({
      message: z.string().meta({ example: "Too many requests." }),
    })
    .describe("Too many requests."),
};
