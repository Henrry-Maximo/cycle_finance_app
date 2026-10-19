import z from "zod";

export const getProfileResponseSchema = {
  200: z
    .object({
      id: z.string().meta({ example: "eyJhbGciOiJIUzI..." }),
      name: z.string().meta({ example: "johndoe" }),
      email: z.string().meta({ example: "email@example.com" }),
      role: z.enum(["MEMBER", "ADMIN"]),
      terms_accepted_at: z.date(),
      terms_version: z.string().meta({ example: "v1" }),
    })
    .describe("Profile informations."),
  404: z
    .object({
      message: z.string().meta({ example: "Resource not found." }),
    })
    .describe("Resource not found."),
};
