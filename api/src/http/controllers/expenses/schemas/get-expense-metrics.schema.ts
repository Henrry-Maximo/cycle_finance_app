import { firstDayMonth, today } from "@/lib/date-current";
import z from "zod";

export const getExpenseMetricsQuerySchema = z.object({
  from: z.string().optional().meta({ example: today }),
  to: z.string().optional().meta({ example: firstDayMonth }),
});

export const getExpenseMetricsResponseSchema = {
  200: z
    .object({
      count_expenses_day: z.number(),
      total_expenses_day: z.number(),
      count_expenses_month: z.number(),
      total_expenses_month: z.number(),
    })
    .describe("Get metrics from user."),
  404: z
    .object({
      message: z.string().meta({ example: "User not found." }),
    })
    .describe("User not found."),
};
