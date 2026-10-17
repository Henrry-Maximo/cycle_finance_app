import z from "zod";

export const postExpenseAnalyzeBodySchema = z.object({
  receipt: z
    .object({
      buffer: z.instanceof(Buffer),
      mimetype: z.enum(["image/jpeg", "image/png"]),
    })
    .describe("Receipt image file"),
});
