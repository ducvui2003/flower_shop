const APP_CONFIG = {
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
