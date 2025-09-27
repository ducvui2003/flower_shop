import z, { string } from 'zod';

const CreateUserResponseSchema = z.object({
  id: z.int(),
  name: z.string(),
});

const TokenSchema = z.object({
  token: z.string(),
  exp: z.number(), //second
  iat: z.number(), //second
  expiresAt: z.date(),
});

const LoginResponseSchema = z.object({
  access: TokenSchema,
  refresh: TokenSchema,
});

const RenewResponseSchema = z.object({
  access: TokenSchema,
});

type CreateUserResponseType = z.infer<typeof CreateUserResponseSchema>;
type LoginResponseType = z.infer<typeof LoginResponseSchema>;
type RenewResponseType = z.infer<typeof RenewResponseSchema>;

export { CreateUserResponseSchema, LoginResponseSchema, RenewResponseSchema };
export type { CreateUserResponseType, LoginResponseType, RenewResponseType };
