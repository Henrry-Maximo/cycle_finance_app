import "dotenv/config"; // variáveis carregadas
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
  PORT: z.coerce.number().default(3333),
});

// [safeParse]: efetua validação dos dados
const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("❌ Invalid environment variables", _env.error.format());

  throw new Error("Invalid environment variables."); // encerrar o servidor se algum valor não corresponder
}

export const env = _env.data;
