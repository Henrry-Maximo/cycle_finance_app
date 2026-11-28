import { env } from "@/env";
import z from "zod";

const recaptchaResponseSchema = z.object({
  success: z.boolean(),
});

export async function verifyRecaptcha(token: string): Promise<boolean> {
  const params = new URLSearchParams({
    secret: env.RECAPTCHA_SECRET_KEY,
    response: token,
  });

  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  const data = recaptchaResponseSchema.parse(await res.json());
  return data.success;
}
