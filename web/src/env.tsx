import z from 'zod';

const envSchema = z.object({
  VITE_API_URL: z.url().default(''),
});

// process = nodejs
// import.meta = vitejs
export const env = envSchema.parse(import.meta.env);
