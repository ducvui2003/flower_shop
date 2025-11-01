import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React, { ComponentProps } from 'react';

type LogoProps = ComponentProps<'a'>;

const Logo = ({ className }: LogoProps) => {
  return (
    <Link href="/" className={cn(className)}>
      <Image
        src={'/logo.jpg'}
        alt="logo"
        width={100}
        height={100}
        priority
        placeholder="blur"
        blurDataURL={'/blur.jpg'}
        className="overflow-hidden rounded-full"
      />
    </Link>
  );
};

export default Logo;
