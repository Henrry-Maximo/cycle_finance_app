import z from "zod";

export const getCategoryQuerySchema = z.object({
  query: z.string().optional().meta({ example: "pães" }),
  page: z.coerce.number().default(0).meta({ example: 0 }),
});

export const getCategoryResponseSchema = {
  200: z
    .object({
      categories: z.array(
        z.object({
          id: z.string().meta({ example: "286171c3-85a1..." }),
          title: z.string().meta({ example: "Alimentação" }),
          description: z
            .string()
            .nullable()
            .meta({ example: "Custo com pães e derivados." }),
          created_at: z.date().meta({
            example: "2023-01-01T12:00:00.000Z",
          }),
          user_id: z.string().meta({ example: "355171c3-85a1..." }),
        }),
      ),
    })
    .describe("Fetch categories from user."),
  404: z
    .object({
      message: z.string().meta({
        example: "User not found.",
      }),
    })
    .describe("User not found."),
};
