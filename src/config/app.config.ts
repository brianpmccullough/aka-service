import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const nodeEnvSchema = z.enum(['development', 'test', 'production']);

const envSchema = z.object({
  NODE_ENV: nodeEnvSchema.default('development'),
  PORT: z.coerce.number().int().positive().max(65535).default(3000),
});

export type NodeEnv = z.infer<typeof nodeEnvSchema>;

export interface AppConfig {
  nodeEnv: NodeEnv;
  port: number;
}

export const appConfig = registerAs('app', (): AppConfig => {
  const env = envSchema.parse(process.env);

  return {
    nodeEnv: env.NODE_ENV,
    port: env.PORT,
  };
});

export function validateConfig(
  config: Record<string, unknown>,
): Record<string, unknown> {
  envSchema.parse(config);
  return config;
}
