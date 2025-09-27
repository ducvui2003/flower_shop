import logger from '@/utils/logger.util';
import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';
import { z } from 'zod';

config({ path: '.env' });

if (!fs.existsSync(path.resolve('.env'))) {
  console.error('❌ No .env file found in the root directory');
  process.exit(1);
}

const envSchema = z.object({
  PORT: z.coerce.number().transform(Number),
  DATABASE_URL: z.string(),

  AT_SECRET: z.string(),
  AT_EXPIRIES: z.coerce.number(), //second
  RT_SECRET: z.string(),
  RT_EXPIRIES: z.coerce.number(), //second
  ALLOW_ORIGINS: z.coerce.string().transform((val) => val.split(',')),

  REDIS_URL: z.string(),
});

const configServer = envSchema.safeParse(process.env);

if (!configServer.success) {
  logger.error('❌ Invalid environment variables:');
  configServer.error.issues.forEach((issue) => {
    logger.error(
      ` - ${issue.path.join('.')}: ${issue.message} (expected: ${issue.code})`,
    );
  });
  process.exit(1);
}

const envConfig = configServer.data;
export default envConfig;
