import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React, { ComponentProps } from 'react';

type LogoProps = ComponentProps<'a'>;

const Logo = ({ className }: LogoProps) => {
  return (
    <Link href="/" className={cn('', className)}>
      <Image
        src={'/logo.jpg'}
        alt="logo"
        width={95}
        height={95}
        priority
        placeholder="blur"
        blurDataURL={'/blur.jpg'}
        objectFit={'contain'}
        className="overflow-hidden rounded-full"
        objectPosition={'center'}
      />
    </Link>
  );
};

export default Logo;
