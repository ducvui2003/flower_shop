import MESSAGE from '@/utils/message.util';
import { passwordSchema } from '@/utils/validation.util';
import z from 'zod/v4';

const CreateUserReqSchema = z.object({
  name: z.string({ error: MESSAGE.VALIDATION.NAME.REQUIRED }),
  email: z.email({
    error: MESSAGE.VALIDATION.EMAIL.INVALID,
  }),
  password: passwordSchema,
});
type CreateUserReqType = z.infer<typeof CreateUserReqSchema>;

const LoginReqSchema = z.object({
  email: z.email({
    error: MESSAGE.VALIDATION.EMAIL.INVALID,
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
