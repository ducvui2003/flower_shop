import Providers from '@/app/provider';
import type { Metadata } from 'next';
import './globals.css';

import { Inter } from 'next/font/google';
import getServerSession from '@/components/auth/getServerSession';
import envConfig from '@/config/env.config';
import { DESCRIPTION, TITLE } from '@/utils/const.util';
import { headers } from 'next/headers';
import Head from 'next/head';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export async function generateMetadata() {
  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = headersList.get('x-forwarded-proto') || 'https';
  const baseUrl = `${protocol}://${host}`;

  return {
    title: TITLE,
    description: DESCRIPTION,
    icons: {
      icon: '/favicon/favicon.ico',
      shortcut: '/favicon/favicon.ico',
      apple: '/favicon/apple-touch-icon.png',
    },
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      url: baseUrl,
      type: 'website',
      siteName: TITLE,
      images: [
        {
          url: `${baseUrl}/images/logo-transparent.png`,
          width: 800,
          height: 600,
        },
      ],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <Head>
        <meta
          property="fb:app_id"
          content={envConfig.NEXT_PUBLIC_FACEBOOK_CLIENT_ID}
        />
      </Head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
