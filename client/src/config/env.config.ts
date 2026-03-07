import { z } from 'zod';
import { createEnv } from '@t3-oss/env-nextjs'; // or core package

const envConfig = createEnv({
  server: {
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    FACEBOOK_CLIENT_ID: z.string(),
    FACEBOOK_CLIENT_SECRET: z.string(),
    DOMAIN: z.string(),
    CLOUDFLARE_SECRET_KEY: z.string(),
    SERVER_INTERNAL: z.string(),
  },
  client: {
    NEXT_PUBLIC_CLOUDFLARE_SITE_KEY: z.string(),
    NEXT_PUBLIC_SERVER_EXTERNAL: z.string(),
  },
  runtimeEnv: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
    FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
    DOMAIN: process.env.DOMAIN,
    CLOUDFLARE_SECRET_KEY: process.env.CLOUDFLARE_SECRET_KEY,
    NEXT_PUBLIC_CLOUDFLARE_SITE_KEY:
      process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY,
    NEXT_PUBLIC_SERVER_EXTERNAL: process.env.NEXT_PUBLIC_SERVER_EXTERNAL,
    SERVER_INTERNAL: process.env.SERVER_INTERNAL,
  },
});
export default envConfig;
