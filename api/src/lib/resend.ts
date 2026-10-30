import { env } from "@/env";
import { Resend } from "resend";

const resend = new Resend(env.RESEND_API_KEY);

if (resend.apiKeys === undefined) {
  console.error("Service email not available.");
}

interface sendEmailProps {
  email: string;
  subject: string;
  content: string;
}

export async function sendEmail({ email, subject, content }: sendEmailProps) {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject,
    html: `<strong>${content}</strong>`,
  });
}
