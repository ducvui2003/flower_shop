import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ALT } from '@/utils/const.util';
import Image from 'next/image';
import React from 'react';
import srcImage from '/public/images/banner.png';
import {
  Carousel,
  CarouselContent,
  CarouselDot,
  CarouselItem,
} from '@/components/ui/carousel';

const Banner = () => {
  return (
    <Carousel>
      <CarouselContent>
        <CarouselItem>
          <AspectRatio ratio={1440 / 568}>
            <Image
              src={srcImage}
              alt={ALT}
              fill
              className="h-full w-auto rounded-md object-contain object-top"
              placeholder="blur"
            />
          </AspectRatio>
        </CarouselItem>
        <CarouselItem>
          <AspectRatio ratio={1440 / 568}>
            <Image
              src={srcImage}
              alt={ALT}
              fill
              className="h-full w-auto rounded-md object-contain object-top"
              placeholder="blur"
            />
          </AspectRatio>
        </CarouselItem>
        <CarouselItem>
          <AspectRatio ratio={1440 / 568}>
            <Image
              src={srcImage}
              alt={ALT}
              fill
              className="h-full w-auto rounded-md object-contain object-top"
              placeholder="blur"
            />
          </AspectRatio>
        </CarouselItem>
      </CarouselContent>
      <div className="pc:justify-center flex justify-end">
        <CarouselDot />
      </div>
    </Carousel>
  );
};

export default Banner;
