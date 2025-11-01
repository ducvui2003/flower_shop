import { z } from 'zod';

const messageMinLength = 10;

const SendContactSchema = z.object({
  fullName: z.string({
    required_error: 'Họ và tên không được bỏ trống',
  }),
  subject: z.string().optional(),
  email: z
    .string({
      required_error: 'Email không được bỏ trống',
    })
    .email('Email không hợp lệ'),
  message: z
    .string()
    .min(messageMinLength, `Nội dung liên hệ phải ít nhất ${messageMinLength}`),
});

export { SendContactSchema };
