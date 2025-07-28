import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default('3333').transform(Number),
  ORIGIN: z.string(),
  CONNECTION_STRING_DB: z.string().min(1),
  JWT_REFRESH_SECRET: z.string().min(1),
  JWT_SECRET: z.string().min(1),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('Erro na validação das variáveis de ambiente:', _env.error.format());
  throw new Error('Variáveis de ambiente inválidas ou ausentes');
}

export const env = _env;
