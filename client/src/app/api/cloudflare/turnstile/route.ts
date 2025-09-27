import envConfig from '@/config/env.config';
import { NextRequest } from 'next/server';

type TurnstileResponse = {
  success: boolean;
  challenge_ts: string; // timestamp of the challenge
  hostname: string; // hostname of the site where the challenge was solved
  'error-codes'?: string[]; // array of error codes if the challenge was not solved successfully
};

const POST = async (req: NextRequest) => {
  const { token } = await req.json();
  const ip = (req.headers.get('x-forwarded-for') ?? '127.0.0.1')
    .split(',')[0]
    .trim();

  let formData = new FormData();
  formData.append('secret', envConfig.NEXT_PUBLIC_CLOUDFLARE_SECRET_KEY);
  formData.append('response', token);
  formData.append('remoteip', ip);

  const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
  const result = await fetch(url, {
    body: formData,
    method: 'POST',
  });

  const outcome: TurnstileResponse = await result.json();
  console.log(`Turnstile verification result: ${outcome}`);
  if (outcome.success) {
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } else
    return new Response(JSON.stringify({ success: false, error: outcome }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
};
export { POST };
