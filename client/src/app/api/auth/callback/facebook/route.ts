//http://localhost:3000/api/auth/callback/facebook?code=AQDtDFoI55GU-JywuAzhSkDC4W0ailyIImjEXZT-xbe5Dnm1rigwsXUPVwaXf5AqQ_W5n_JmxPQxqTGg183uvYUE4hQYhzwCMOAgWV9Plhw9eGJKAgo0xD7d7MH51_ddcRKP3bL-jSOk-kxlXZUV_bP2s65DwKs_JQNGX1BBJKjYVfyNr-qMa2v4YEL92KGds_Tl5cCBNNROyatllgGpwbb6huhmCirZm19uaPA_GjMyIR4t5vYkVo5huOusoPotq501tr_2C_zp-bkAlfDcyfr-HMdmJCj62fM_7cUgZtKCRfOVHrMN74BN8AAy0uHuyFAhSA7Piog1P3mmhTRELjSFQbtCjy7rMPPNvgzg5ubwyhq0vR2H6gz6Q0B0yBJ-kCCbiogi9PY_F0OYgjnRSGlGN830pAcP3BL41FWaaNnEbA&state=%252F#_=_

import { Session } from '@/app/api/auth/session/type';
import envConfig from '@/config/env.config';
import { HOME_PAGE } from '@/utils/const.util';
import { setSession } from '@/lib/auth.helper';
import { getServerSideProps } from '@/lib/server.helper';
import oauth2Api from '@/service/oauth2.service';
import { NextRequest, NextResponse } from 'next/server';

type FacebookExchangeToken = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = decodeURIComponent(searchParams.get('state') || HOME_PAGE);
  if (!code) return;
  const { origin } = await getServerSideProps(request);

  const accessTokenUrl = 'https://graph.facebook.com/v22.0/oauth/access_token';
  const params = new URLSearchParams();
  params.append('client_id', envConfig.NEXT_PUBLIC_FACEBOOK_CLIENT_ID);
  params.append('client_secret', envConfig.NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET);
  params.append('code', code);
  params.append('redirect_uri', `${origin}/api/auth/callback/facebook`);
  console.log(`${origin}/api/auth/callback/facebook`);
  const responseExchangeAccessToken = await fetch(
    `${accessTokenUrl}?${params.toString()}`,
  );

  const exchangeCode: FacebookExchangeToken =
    await responseExchangeAccessToken.json();

  const responseFromServer = await oauth2Api.login(
    exchangeCode.access_token,
    'facebook',
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

    const response = NextResponse.redirect(`${origin}${state}?facebook=true`);

    setSession(session, response);

    return response;
  } else {
    return NextResponse.redirect(`${origin}${state}?facebook=false`);
  }
};

export { GET };
