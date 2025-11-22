import { AppErrorBuilder } from '@/shared/errors/app-error';

const AUTH_CONST = {
  VALIDATION: {
    PASSWORD: {
      REQUIRED: 'Password is required',
      MIN_LENGTH: 'Password need at least 8 characters',
      LOWERCASE: 'Must contain at least one lowercase letter',
      UPPERCASE: 'Must contain at least one uppercase letter',
      SPECIAL_CHAR: 'Must contain at least one special character',
    },
    EMAIL: {
      REQUIRED: 'Name is required',
      INVALID: 'Invalid email address',
    },
    NAME: {
      REQUIRED: 'Name is required',
    },
  },
  REGEX: {
    MIN_LENGTH_PW: 8,
    REGEX_LOWERCASE: /(?=.*[a-z])/,
    REGEX_UPPERCASE: /(?=.*[A-Z])/,
    REGEX_SPECIAL_CHAR: /(?=.*[!@#$%^&*])/,
  },
  HTTP: {
    LOGIN: 'Login',
    REGISTER: 'Register',
    RENEW: 'Renew token',
    LOGOUT: 'Logout',
  },
  ERROR: {
    EMAIL_REGISTER: AppErrorBuilder.conflict('Email is exist'),
    NO_DEFINE: AppErrorBuilder.internal('No define'),
    UNAUTHORIZED: AppErrorBuilder.unauthorized('User not authorized'),
    TOKEN: AppErrorBuilder.conflict('Token Exception'),
  },
};

export default AUTH_CONST;
