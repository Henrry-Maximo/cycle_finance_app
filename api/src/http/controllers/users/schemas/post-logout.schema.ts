import z from "zod";

export const postLogoutResponseSchema = {
  200: z
    .object({
      message: z.string().meta({ example: "Logout from user." }),
    })
    .describe("Logout from user."),
};
