import { NextRequest } from 'next/server';

export async function getServerSideProps(req: NextRequest) {
  const { headers } = req;

  const protocol = headers.get('x-forwarded-proto') || 'http';
  const host = headers.get('host');
  const origin = `${protocol}://${host}`;

  return {
    origin: origin,
  };
}
