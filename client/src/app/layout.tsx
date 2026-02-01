import Providers from '@/app/provider';
import '@/app/globals.css';

import { Inter, Playfair_Display } from 'next/font/google';
import envConfig from '@/config/env.config';
import { APP_INFO, DESCRIPTION } from '@/utils/const.util';
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

export const metadata = {
  metadataBase: new URL(envConfig.NEXT_PUBLIC_BASE_URL),
  title: {
    default: APP_INFO.NAME,
    template: `%s | ${APP_INFO.NAME}`,
  },

  description: DESCRIPTION,

  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon.ico',
    apple: '/favicon/apple-touch-icon.png',
  },

  openGraph: {
    title: APP_INFO.NAME,
    description: DESCRIPTION,
    type: 'website',
    siteName: APP_INFO.NAME,
    images: [
      {
        url: '/images/logo-transparent.png',
        width: 800,
        height: 600,
      },
    ],
  },

  other: {
    'fb:app_id': envConfig.NEXT_PUBLIC_FACEBOOK_CLIENT_ID,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${inter.className} ${playfair.className}`}>
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
