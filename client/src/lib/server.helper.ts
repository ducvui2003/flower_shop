import { BreakPointType } from '@/utils/const.util';
import { headers } from 'next/headers';
import { NextRequest } from 'next/server';

const getServerSideProps = async (req: NextRequest) => {
  const { headers } = req;

  const protocol = headers.get('x-forwarded-proto') || 'http';
  const host = headers.get('host');
  const origin = `${protocol}://${host}`;

  return {
    origin: origin,
  };
};

const getDeviceServer = async (): Promise<BreakPointType> => {
  const headersList = await headers();
  const ua = headersList.get('user-agent') || '';

  let device: 'pc' | 'mobile' | 'tablet' = 'pc';
  if (/mobile/i.test(ua)) device = 'mobile';
  else if (/tablet/i.test(ua)) device = 'tablet';

  return device;
};

export { getDeviceServer, getServerSideProps };
