import z from "zod";

export const patchTokenRefreshResponseSchema = {
  200: z.object({
    token: z.string().meta({ example: "eyJhbGciOiJIUzI..." }),
  }),
};
