import { firstDayMonth, today } from "@/lib/date-current";
import z from "zod";

export const getExpensePeriodQuerySchema = z.object({
  from: z.string().optional().meta({ example: today }),
  to: z.string().optional().meta({ example: firstDayMonth }),
});
