const MESSAGE = {
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
    HTTP: {
      COMMON: 'VALIDATION ERROR',
    },
  },
  HTTP: {
    LOGIN: 'Login',
    REGISTER: 'Register',
    RENEW: 'Renew token',
    LOGOUT: 'Logout',
  },
};

export default MESSAGE;
