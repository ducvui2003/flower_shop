import { Session } from '@/app/api/auth/session/type';
import { AuthState } from '@/features/auth/auth.slice';
import authService from '@/service/auth.service';

type Credentials = {
  email: string;
  password: string;
};

/**
 * Handle sign in with server
 * if success, call to server component and set cookie
 * if error, throw error
 * @param credentials
 */
const signIn = async (
  credentials: Credentials,
): Promise<Omit<AuthState, 'status'>> => {
  const response = await authService.login(credentials);
  if (response) {
    const { accessToken, refreshToken, expiresAt, ...props } = response;
    const session: Session = {
      accessToken: accessToken,
      refreshToken: refreshToken,
      expiresAt: expiresAt,
      user: props,
    };
    await fetch(`/api/auth/session`, {
      method: 'POST',
      body: JSON.stringify(session),
    });
    return {
      accessToken: accessToken,
      expiresAt: expiresAt,
      user: {
        id: props.id,
        email: props.email,
        name: props.name ?? '',
        avatar: props.avatar,
        role: props.role,
      },
    };
  } else {
    throw new Error('Login Failed');
  }
};
export default signIn;
