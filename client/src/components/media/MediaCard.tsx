'use client';

import { cn } from '@/lib/utils';
import { forwardRef, HTMLAttributes } from 'react';

type MediaCardProps = {
  url: string;
} & HTMLAttributes<HTMLDivElement>;

const MediaCard = forwardRef<HTMLDivElement, MediaCardProps>(
  ({ url, className, ...props }, ref) => {
    return (
      <div
        className={cn(
          'border-accent relative aspect-square rounded-xl border-2 p-1',
          className,
        )}
        {...props}
      >
        <img
          src={url}
          className="size-full rounded-xl bg-white object-center"
        />
      </div>
    );
  },
);

export default MediaCard;
