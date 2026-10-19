import z from "zod";

export const getUsersQuerySchema = z.object({
  query: z.string().optional().nullable().meta({ example: "john" }),
  page: z.coerce.number().meta({ example: 0 }),
});

export const getUsersResponseSchema = {
  200: z
    .object({
      users: z.array(
        z.object({
          id: z.string().meta({ example: "eyJhbGciOiJIUzI..." }),
          name: z.string().meta({ example: "John Doe" }),
          email: z.string().meta({ example: "email@example.com" }),
          // password_hash: z.string(),
          role: z.enum(["MEMBER", "ADMIN"]),
          terms_accepted_at: z.date(),
          terms_version: z.string().meta({ example: "v1" }),
        }),
      ),
      meta: z.object({
        page: z.number(),
        perPage: z.number().meta({ example: 10 }),
        totalCount: z.number(),
        totalPages: z.number(),
      }),
    })
    .describe("Return all the users."),
  403: z
    .object({
      message: z.string().meta({ example: "Forbidden." }),
    })
    .describe("Insufficient permission, only for admin."),
};
