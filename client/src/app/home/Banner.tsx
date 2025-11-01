import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ALT } from '@/utils/const.util';
import Image from 'next/image';
import React from 'react';
import slider1 from '/public/slide/slider-01.jpg';
import slider2 from '/public/slide/slider-02.jpg';
import slider3 from '/public/slide/slider-03.jpg';
import {
  Carousel,
  CarouselContent,
  CarouselDot,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const Banner = () => {
  return (
    <Carousel className="relative">
      <CarouselContent>
        <CarouselItem>
          <AspectRatio ratio={640 / 178}>
            <Image
              src={slider1}
              alt={ALT}
              fill
              className="h-full w-auto object-contain object-top"
              placeholder="blur"
            />
          </AspectRatio>
        </CarouselItem>
        <CarouselItem>
          <AspectRatio ratio={640 / 178}>
            <Image
              src={slider2}
              alt={ALT}
              fill
              className="h-full w-auto object-contain object-top"
              placeholder="blur"
            />
          </AspectRatio>
        </CarouselItem>
        <CarouselItem>
          <AspectRatio ratio={640 / 178}>
            <Image
              src={slider3}
              alt={ALT}
              fill
              className="h-full w-auto object-contain object-top"
              placeholder="blur"
            />
          </AspectRatio>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious className="hover:bg-primary absolute top-1/2 left-4 translate-y-1/2 hover:text-white" />
      <CarouselNext className="hover:bg-primary absolute top-1/2 right-4 translate-y-1/2 hover:text-white" />
      <div className="pc:justify-center absolute bottom-5 left-1/2 flex -translate-x-1/2 justify-end">
        <CarouselDot />
      </div>
    </Carousel>
  );
};

export default Banner;
