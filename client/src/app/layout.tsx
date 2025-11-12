import Providers from '@/app/provider';
import '@/app/globals.css';

import { Inter, Playfair_Display } from 'next/font/google';
import envConfig from '@/config/env.config';
import { APP_INFO, DESCRIPTION } from '@/utils/const.util';
import { headers } from 'next/headers';
import Head from 'next/head';
import Header from '@/components/common/Header';
import HeaderSticky from '@/components/common/HeaderSticky';
import Footer from '@/components/common/Footer';
import { Separator } from '@/components/ui/separator';

const playfair = Playfair_Display({
  subsets: ['vietnamese'],
  weight: ['400', '700'],
  variable: '--font-playfair',
});

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-inter',
});

export async function generateMetadata() {
  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = headersList.get('x-forwarded-proto') || 'https';
  const baseUrl = `${protocol}://${host}`;

  return {
    title: APP_INFO.NAME,
    description: DESCRIPTION,
    icons: {
      icon: '/favicon/favicon.ico',
      shortcut: '/favicon/favicon.ico',
      apple: '/favicon/apple-touch-icon.png',
    },
    openGraph: {
      title: APP_INFO.NAME,
      description: DESCRIPTION,
      url: baseUrl,
      type: 'website',
      siteName: APP_INFO.NAME,
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
    <html lang="vi" className={`${inter.className} ${playfair.className}`}>
      <Head>
        <meta
          property="fb:app_id"
          content={envConfig.NEXT_PUBLIC_FACEBOOK_CLIENT_ID}
        />
      </Head>
      <body>
        <Providers>
          <Header />
          <HeaderSticky />
          <Separator />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
