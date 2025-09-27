import envConfig from '@/config/env.config';
import { HOME_PAGE } from '@/utils/const.util';

const redirectUri = `${window.location.origin}/api/auth/callback/facebook`;

const signInFacebook = ({
  redirectUrl = HOME_PAGE,
}: {
  redirectUrl?: string;
} = {}) => {
  const params = new URLSearchParams({
    client_id: envConfig.NEXT_PUBLIC_FACEBOOK_CLIENT_ID,
    redirect_uri: redirectUri,
    state: encodeURIComponent(redirectUrl),
    scope: 'email,public_profile',
  });

  window.location.replace(
    `https://www.facebook.com/v22.0/dialog/oauth?${params.toString()}`,
  );
};
export default signInFacebook;
