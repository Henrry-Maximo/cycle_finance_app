import { today } from "@/lib/date-current";
import z from "zod";

export const postExpenseAnalyzeBodySchema = z.object({
  receipt: z
    .object({
      buffer: z.instanceof(Buffer),
      mimetype: z.enum(["image/jpeg", "image/png"]),
    })
    .describe("Receipt image file"),
});

export const postExpenseAnalyzeResponseSchema = {
  200: z
    .object({
      title: z.string().meta({ example: "pães" }),
      amount: z.number().meta({ example: 10.52 }),
      date: z.string().meta({ example: today }),
      category: z.string().meta({ example: "Alimentação" }),
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
