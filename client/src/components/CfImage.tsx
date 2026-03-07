/* eslint-disable jsx-a11y/alt-text */
'use client';
import envConfig from '@/config/env.config';
import Image, { ImageLoader, ImageLoaderProps, ImageProps } from 'next/image';
import { forwardRef } from 'react';

const FALLBACK_CDN = envConfig.NEXT_PUBLIC_CLOUDFLARE_DOMAIN;
const ABSOLUTE_URL_REGEX = /^https?:\/\//i;
const cloudflareLoader: ImageLoader | undefined = ({
  src,
  width,
  quality,
}: ImageLoaderProps) => {
  let baseUrl: string;

  // check if src contains a domain
  if (/^https?:\/\//i.test(src)) {
    const parsed = new URL(src);
    baseUrl = parsed.origin;
    src = parsed.pathname.replace(/^\/+/, '');
  } else {
    baseUrl = FALLBACK_CDN;
    src = src.replace(/^\/+/, '');
  }

  const params = [
    `width=${width}`,
    `quality=${quality || 75}`,
    `format=auto`,
  ].join(',');
  return `${baseUrl}/cdn-cgi/image/${params}/${src}`;
};

export { cloudflareLoader };

type CfImageProps = ImageProps;

const CfImage = forwardRef<HTMLImageElement, CfImageProps>(
  ({ loader = cloudflareLoader, src, ...props }, ref) => {
    if (typeof src === 'object') {
      return <Image {...props} src={src} ref={ref} />;
    }
    if (!ABSOLUTE_URL_REGEX.test(src)) {
      return <Image {...props} src={src} ref={ref} />;
    }
    return <Image {...props} src={src} loader={loader} ref={ref} />;
  },
);

CfImage.displayName = 'CfImage';

export default CfImage;
