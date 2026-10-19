import z from "zod";

export const deleteCategoryQuerySchema = z.object({
  id: z.string().meta({ example: "01a131f5-d211..." }),
});
