const APP_CONFIG = {
  PASSWORD: {
    MIN_LENGTH_PW: 8,
    REGEX_LOWERCASE: /(?=.*[a-z])/,
    REGEX_UPPERCASE: /(?=.*[A-Z])/,
    REGEX_SPECIAL_CHAR: /(?=.*[!@#$%^&*])/,
  },
  INJECT: {
    DATABASE: 'PrismaService',
    REPOSITORY: {
      USER: 'UserRepository',
    },
    SERVICE: {
      AUTH: 'AuthService',
      HASH: 'HashService',
      ACCESS_TOKEN: 'AccessTokenService',
      REFRESH_TOKEN: 'RefreshTokenService',
    },
    CONTROLLER: {
      AUTH: 'AuthController',
    },
  },
  URL: {
    FREE: ['/api/auth/login', '/api/auth/register'],
    ALLOW: {
      ADMIN: [],
      GUEST: [],
    },
  },
};

export default APP_CONFIG;
