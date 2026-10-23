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
      title: z.string().optional().meta({ example: "pães" }),
      amount: z.number().optional().meta({ example: 10.52 }),
      date: z.string().optional().meta({ example: today }),
      transactionId: z.string().optional().meta({ example: "21481329287482" }),
      cpfOrCNPJ: z.string().optional().meta({ example: "69.034.668/0001-56" }),
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
