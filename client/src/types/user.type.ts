import { PageReq } from '@/types/api.type';
import { Role } from '@/types/auth.type';
import { passwordSchema } from '@/types/schema/auth.schema';
import { z } from 'zod';
interface User {
  id: number;
  email: string;
  name?: string;
  avatar?: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  role: Role;
}
type UserInfoResType = {
  id: number;
  email: string;
  name?: string;
  phone?: string;
  avatar?: string;
  status: UserStatus;
  dob?: Date;
  role: string;
};

type UserStatus = 'ACTIVE' | 'INACTIVE' | 'BLOCKED';

type SearchQueyReqType = {
  id?: number;
  name?: string;
  email?: string;
  status?: UserStatus | UserStatus[];
};

enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  UNKNOWN = 'UNKNOWN',
}

type GetUserQueryReqType = PageReq<SearchQueyReqType>;

type GetUserResType = {
  id: number;
  email: string;
  name: string;
  dob: Date;
  phone: string;
  status: UserStatus;
  avatar?: string;
  createdAt: Date;
  role: Role;
};

type GetAddressDetailResType = {
  province: string;
  district: string;
  ward: string;
  detail: string;
};

type GetUserDetailResType = GetUserResType & {
  addresses: GetAddressDetailResType[];
};

const InformationFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Tên người dùng không hợp lệ')
    .max(50, 'Tên người dùng không hợp lệ')
    .optional(),
  phone: z
    .string()
    .min(10, 'Số điện thoại phải có ít nhất 10 chữ số')
    .max(11, 'Số điện thoại không được quá 11 chữ số')
    .regex(/^[0-9]+$/, 'Số điện thoại không hợp lệ')
    .optional(),
  dob: z.coerce.date().optional(),
  gender: z.enum([Gender.FEMALE, Gender.MALE, Gender.UNKNOWN]).optional(),
});

const PasswordFormSchema = z
  .object({
    password: z.string().min(1),
    newPassword: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine(
    (data) => {
      return data.newPassword === data.confirmPassword;
    },
    {
      path: ['confirmPassword'],
      message: 'Mật khẩu không khớp',
    },
  );

type InformationFormType = z.infer<typeof InformationFormSchema>;
type PasswordFormType = z.infer<typeof PasswordFormSchema>;

export { InformationFormSchema, PasswordFormSchema, Gender };

export type {
  UserInfoResType,
  UserStatus,
  GetUserQueryReqType,
  GetUserResType,
  GetUserDetailResType,
  SearchQueyReqType,
  User,
  InformationFormType,
  PasswordFormType,
};
