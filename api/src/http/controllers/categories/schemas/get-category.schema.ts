import z from "zod";

export const getCategoryQuerySchema = z.object({
  query: z.string().optional().meta({ example: "pães" }),
  page: z.coerce.number().default(0).meta({ example: 0 }),
});
