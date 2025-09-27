'use client';
import React from 'react';
import { default as NextLink } from 'next/link';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

type LinkProps = ComponentProps<typeof NextLink> & {
  activeClassName?: string;
  exec?: boolean;
};

const Link = ({
  href,
  children,
  activeClassName,
  exec = false,
  className,
  ...props
}: LinkProps) => {
  const pathname = usePathname();
  const isActive = exec
    ? pathname === href
    : pathname.startsWith(href.toString());
  return (
    <NextLink legacyBehavior href={href} passHref {...props}>
      <a
        className={cn(
          'hover:cursor-pointer',
          className,
          isActive && activeClassName,
        )}
      >
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
