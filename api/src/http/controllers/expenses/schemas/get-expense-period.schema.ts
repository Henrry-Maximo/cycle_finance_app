import { firstDayMonth, today } from "@/lib/date-current";
import z from "zod";

export const getExpensePeriodQuerySchema = z.object({
  from: z.coerce.date().optional().meta({ example: today }),
  to: z.coerce.date().optional().meta({ example: firstDayMonth }),
});

export const getExpensePeriodResponseSchema = {
  200: z
    .object({
      expenses: z.array(
        z.object({
          date: z.string().meta({ example: today }),
          value: z.number(),
        }),
      ),
    })
    .describe("Fetch expenses grouped by date from user."),
  404: z
    .object({
      message: z.string().meta({ example: "User not found." }),
    })
    .describe("User not found."),
};
