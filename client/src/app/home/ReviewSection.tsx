'use client';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import React, { useEffect } from 'react';

const ReviewSection = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section className="bg-[#FFF5EA]">
      <div className="container">
        <Carousel setApi={setApi}>
          <CarouselContent>
            {Array.from({ length: 3 }).map((_, index) => {
              return (
                <CarouselItem
                  key={index}
                  className="pt-[100px] text-center text-xl font-light"
                >
                  <q className="mx-auto block w-1/2 text-wrap">
                    This essential oil has a refreshing aroma that instantly
                    uplifts my mood. A must-have for relaxation!
                  </q>
                  <p className="mt-14">- Brian Nguyen -</p>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
        <div className="mx-auto flex w-fit gap-3 pb-2 pt-4">
          {Array.from({ length: count }).map((_, index) => (
            <span
              key={index}
              className={cn(
                'border-1 inline-block size-2.5 rounded-full',
                current - 1 == index ? 'bg-[#FFC382]' : 'bg-[#D9D9D9]',
              )}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
