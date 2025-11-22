import AUTH_CONST from '@/modules/auth/auth.const';
import z from 'zod/v4';

const passwordSchema = z.coerce
  .string({
    error: AUTH_CONST.VALIDATION.PASSWORD.REQUIRED,
  })
  .min(AUTH_CONST.REGEX.MIN_LENGTH_PW, {
    error: AUTH_CONST.VALIDATION.PASSWORD.MIN_LENGTH,
  })
  .regex(AUTH_CONST.REGEX.REGEX_LOWERCASE, {
    error: AUTH_CONST.VALIDATION.PASSWORD.LOWERCASE,
  })
  .regex(AUTH_CONST.REGEX.REGEX_UPPERCASE, {
    error: AUTH_CONST.VALIDATION.PASSWORD.UPPERCASE,
  })
  .regex(AUTH_CONST.REGEX.REGEX_SPECIAL_CHAR, {
    error: AUTH_CONST.VALIDATION.PASSWORD.SPECIAL_CHAR,
  });

const CreateUserReqSchema = z.object({
  name: z.string({ error: AUTH_CONST.VALIDATION.NAME.REQUIRED }),
  email: z.email({
    error: AUTH_CONST.VALIDATION.EMAIL.INVALID,
  }),
  password: passwordSchema,
});
type CreateUserReqType = z.infer<typeof CreateUserReqSchema>;

const LoginReqSchema = z.object({
  email: z.email({
    error: AUTH_CONST.VALIDATION.EMAIL.INVALID,
  }),
  password: z.string(),
});

const RenewReqSchema = z.object({
  refreshToken: z.string(),
});

const LogoutReqSchema = RenewReqSchema;
type LoginUserReqType = z.infer<typeof LoginReqSchema>;
type RenewReqType = z.infer<typeof RenewReqSchema>;
type LogoutReqType = RenewReqType;

export { CreateUserReqSchema, LoginReqSchema, RenewReqSchema, LogoutReqSchema };

export type {
  CreateUserReqType,
  LoginUserReqType,
  RenewReqType,
  LogoutReqType,
};
