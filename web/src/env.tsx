import z from 'zod';

const envSchema = z.object({
  VITE_API_URL: z.url().default(''),
  VITE_ENABLE_API_DELAY: z.string().transform((value) => value === 'true'),
  VITE_API_VERSION: z.string().default('1.0.0'),
  VITE_RECAPTCHA_SITE_KEY: z.string(),
});

// process = nodejs
// import.meta = vitejs
export const env = envSchema.parse(import.meta.env);
