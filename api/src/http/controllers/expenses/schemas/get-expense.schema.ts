import { firstDayMonth, today } from "@/lib/date-current";
import z from "zod";

export const getExpenseQuerySchema = z.object({
  expense: z.string().optional().meta({ example: "pães" }),
  category: z.string().optional().meta({ example: "alimentação" }),
  from: z.coerce.date().optional().meta({ example: firstDayMonth }),
  to: z.coerce.date().optional().meta({ example: today }),
  pageIndex: z.coerce.number().meta({ example: 0 }),
});
