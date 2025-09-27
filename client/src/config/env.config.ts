import { z } from 'zod';

const configSchema = z.object({
  NEXT_PUBLIC_SERVER_EXTERNAL: z.string().default(''), //url next client call to nestjs
  NEXT_PUBLIC_SERVER_CONTAINER: z.string().optional().default(''), //url next server call to nestjs
  NEXT_PUBLIC_AUTH_SECRET: z.string().default(''),
  NEXT_PUBLIC_GOOGLE_CLIENT_ID: z.string(),
  NEXT_PUBLIC_GOOGLE_CLIENT_SECRET: z.string(),
  NEXT_PUBLIC_FACEBOOK_CLIENT_ID: z.string(),
  NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET: z.string(),
  NEXT_PUBLIC_LOG_CLIENT: z.string().transform((value) => new Boolean(value)),
  NEXT_PUBLIC_CLOUDFLARE_SITE_KEY: z.string().optional().default(''),
  NEXT_PUBLIC_CLOUDFLARE_SECRET_KEY: z.string().optional().default(''),
  NEXT_PUBLIC_BASE_URL: z.string().optional().default('http://localhost:3000'),
});

const configProject = configSchema.safeParse({
  NEXT_PUBLIC_SERVER_EXTERNAL: process.env.NEXT_PUBLIC_SERVER_EXTERNAL,
  NEXT_PUBLIC_SERVER_CONTAINER: process.env.NEXT_PUBLIC_SERVER_CONTAINER,
  NEXT_PUBLIC_AUTH_SECRET: process.env.NEXT_PUBLIC_AUTH_SECRET,
  NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  NEXT_PUBLIC_GOOGLE_CLIENT_SECRET:
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
  NEXT_PUBLIC_FACEBOOK_CLIENT_ID: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID,
  NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET:
    process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET,
  NEXT_PUBLIC_LOG_CLIENT: process.env.NEXT_PUBLIC_LOG_CLIENT,
  NEXT_PUBLIC_CLOUDFLARE_SITE_KEY: process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY,
  NEXT_PUBLIC_CLOUDFLARE_SECRET_KEY:
    process.env.NEXT_PUBLIC_CLOUDFLARE_SECRET_KEY,
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || '',
});

if (!configProject.success) {
  console.error(configProject.error.issues);
  throw new Error('Các giá trị khai báo trong file .env không hợp lệ');
}

const envConfig = configProject.data;
export default envConfig;
