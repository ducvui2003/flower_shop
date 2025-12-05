import envConfig from '@/shared/config/env.config';

export const createUrl = (key: string) => {
  return `${envConfig.R2_PUBLIC_DOMAIN}/${key}`;
};
