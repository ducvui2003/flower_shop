import APP_CONFIG from '@/config/app.config';
import MESSAGE from '@/utils/message.util';
import z from 'zod';

const passwordSchema = z.coerce
  .string({
    error: MESSAGE.VALIDATION.PASSWORD.REQUIRED,
  })
  .min(APP_CONFIG.PASSWORD.MIN_LENGTH_PW, {
    error: MESSAGE.VALIDATION.PASSWORD.MIN_LENGTH,
  })
  .regex(APP_CONFIG.PASSWORD.REGEX_LOWERCASE, {
    error: MESSAGE.VALIDATION.PASSWORD.LOWERCASE,
  })
  .regex(APP_CONFIG.PASSWORD.REGEX_UPPERCASE, {
    error: MESSAGE.VALIDATION.PASSWORD.UPPERCASE,
  })
  .regex(APP_CONFIG.PASSWORD.REGEX_SPECIAL_CHAR, {
    error: MESSAGE.VALIDATION.PASSWORD.SPECIAL_CHAR,
  });

export { passwordSchema };
