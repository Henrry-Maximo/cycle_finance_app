import z from 'zod';

const envSchema = z.object({
  VITE_API_URL: z.url().default(''),
  VITE_ENABLE_API_DELAY: z.string().transform((value) => value === 'true'),
});

// process = nodejs
// import.meta = vitejs
export const env = envSchema.parse(import.meta.env);
