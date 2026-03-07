import { Button, type ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react';

const CarouselMarkup = ({ children }: { children: ReactNode }) => {
  return <div className="embla relative">{children}</div>;
};

const CarouselMarkupViewport = ({ children }: { children: ReactNode }) => {
  return (
    <div className="embla__viewport">
      <div className="embla__container">{children}</div>
    </div>
  );
};

const CarouselMarkupItem = ({ children }: { children: ReactNode }) => {
  return <div className="embla__slide">{children}</div>;
};

const CarouselPrevButton = ({ children, className, ...props }: ButtonProps) => {
  return (
    <Button className={cn('embla__prev', className)} {...props}>
      {children}
    </Button>
  );
};

const CarouselNextButton = ({ children, className, ...props }: ButtonProps) => {
  return (
    <Button className={cn('embla__next', className)} {...props}>
      {children}
    </Button>
  );
};

export {
  CarouselMarkup,
  CarouselMarkupItem,
  CarouselMarkupViewport,
  CarouselPrevButton,
  CarouselNextButton,
};
