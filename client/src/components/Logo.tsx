import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React, { ComponentProps } from 'react';

type LogoProps = ComponentProps<'a'>;

const Logo = ({ className }: LogoProps) => {
  return (
    <Link
      href="/"
      className={cn('relative block w-full overflow-hidden', className)}
    >
      <Image
        src={
          'https://www.flowercorner.vn/image/catalog/common/shop-hoa-tuoi-flowercorner-logo.png.webp'
        }
        alt="logo"
        fill
        className="object-contain"
      />
    </Link>
  );
};

export default Logo;
