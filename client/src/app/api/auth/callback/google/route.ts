// /api/auth/callback/google?code=4%2F0Ab_5qllXqip7LWj-85bZUHP0SjERY3LyoN1todk9SAJqBV9ZBMm5WiTkHn0cmsegQ1TqcQ
// &scope=email+profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email
// &authuser=0
// &prompt=none

import { Session } from '@/app/api/auth/session/type';
import envConfig from '@/config/env.config';
import { HOME_PAGE } from '@/utils/const.util';
import { setSession } from '@/lib/auth.helper';
import { getServerSideProps } from '@/lib/server.helper';
import oauth2Api from '@/service/oauth2.service';
import { NextRequest, NextResponse } from 'next/server';

type GoogleUser = {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
  id_token: string;
};

const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = decodeURIComponent(searchParams.get('state') || HOME_PAGE);
  if (!code) return;
  const accessTokenUrl = 'https://oauth2.googleapis.com/token';
  const { origin } = await getServerSideProps(request);

  const body = new URLSearchParams();
  body.append('client_id', envConfig.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
  body.append('client_secret', envConfig.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET);
  body.append('code', code);
  body.append('grant_type', 'authorization_code');
  body.append('redirect_uri', `${origin}/api/auth/callback/google`);
  console.log(`${origin}/api/auth/callback/google`);
  const response = await fetch(accessTokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  });

  const userGoogle: GoogleUser = await response.json();

  // calling to server

  const responseFromServer = await oauth2Api.login(
    userGoogle.access_token,
    'google',
  );
  if (responseFromServer) {
    const { accessToken, expiresAt, refreshToken, ...props } =
      responseFromServer;
    const session: Session = {
      accessToken: accessToken,
      expiresAt: expiresAt,
      refreshToken: refreshToken,
      user: props,
    };

    const response = NextResponse.redirect(`${origin}${state}?google=true`);

    setSession(session, response);

    return response;
  } else {
    return NextResponse.redirect(`${origin}${state}?google=false`);
  }
};

export { GET };
