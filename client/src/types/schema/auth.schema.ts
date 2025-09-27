import z from 'zod';

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Must contain at least one special character');

const string = () => z.string().trim().min(1, { message: 'Not Blank' });

const LoginFormSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string(),
});

type LoginFormType = z.infer<typeof LoginFormSchema>;

const RegisterFormSchema = z
  .object({
    email: string().email({
      message: 'Please enter a valid email address.',
    }),
    name: string().min(8),
    password: passwordSchema,
    'confirm-password': z.string(),
  })
  .refine((data) => data.password === data['confirm-password'], {
    message: 'Passwords do not match',
    path: ['confirm-password'],
  });

const VerifyFormSchema = z.object({ otp: string().length(6) });

type RegisterFormType = z.infer<typeof RegisterFormSchema>;

type VerifyFormType = z.infer<typeof VerifyFormSchema>;

export const SendOTPReq = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
});

type SendOTPFormType = z.infer<typeof SendOTPReq>;

const ForgotPasswordFormSchema = z.object({
  email: z.string().email(),
});

type ForgotPasswordFormType = z.infer<typeof ForgotPasswordFormSchema>;

const VerifyForgetPasswordFormSchema = z.object({
  otp: string().length(6),
});

type VerifyForgetPasswordFormType = z.infer<
  typeof VerifyForgetPasswordFormSchema
>;

const ResetPasswordFormSchema = z
  .object({
    password: passwordSchema,
    'confirm-password': z.string(),
  })
  .refine((data) => data.password === data['confirm-password'], {
    message: 'Passwords do not match',
    path: ['confirm-password'],
  });

type ResetPasswordFormType = z.infer<typeof ResetPasswordFormSchema>;

export type {
  LoginFormType,
  RegisterFormType,
  VerifyFormType,
  SendOTPFormType,
  ForgotPasswordFormType,
  VerifyForgetPasswordFormType,
  ResetPasswordFormType,
};

export {
  LoginFormSchema,
  RegisterFormSchema,
  VerifyFormSchema,
  ForgotPasswordFormSchema,
  VerifyForgetPasswordFormSchema,
  ResetPasswordFormSchema,
  passwordSchema,
};
