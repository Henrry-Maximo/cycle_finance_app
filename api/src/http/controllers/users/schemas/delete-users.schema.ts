import z from "zod";

export const deleteUsersParamsSchema = z.object({
  id: z.string().meta({ example: "eyJhbGciOiJIUzI..." }),
});

export const deleteUsersResponseSchema = {
  200: z.null().describe("User delete with successful.").meta({ example: {} }),
  401: z
    .object({
      message: z.string().meta({ example: "Not authorized." }),
    })
    .describe("Not authorized."),
};
