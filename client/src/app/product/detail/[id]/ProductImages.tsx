'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { DEFAULT_IMAGE } from '@/utils/const.util';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useState } from 'react';

type ProductImagesProps = {
  images: string[];
};

export default function ProductImages({ images }: ProductImagesProps) {
  const [selectedImage, setSelectedImage] = useState(
    images[0] ?? DEFAULT_IMAGE,
  );

  return (
    <div className="grid grid-cols-5 gap-4">
      <div className="col-span-5 flex gap-3 pl-1">
        <Carousel
          orientation="vertical"
          opts={{ align: 'start' }}
          className="h-full"
        >
          <CarouselContent className="h-[400px]">
            {images.map((img, index) => (
              <div key={index} className="p-1">
                <CarouselItem className="pt-1 md:basis-1/2">
                  <div className="relative mt-1 size-20">
                    <div className="relative mt-2 size-20">
                      <div
                        className="pointer-events-none absolute inset-0 rounded bg-cover bg-center select-none"
                        style={{ backgroundImage: `url(${img})` }}
                      ></div>
                    </div>

                    <div
                      className={cn(
                        'absolute top-0 left-0 z-30 h-full w-full cursor-pointer rounded',
                        selectedImage === img
                          ? 'ring-accent ring-2 ring-inset'
                          : '',
                      )}
                      onClick={() => setSelectedImage(img)}
                    ></div>
                  </div>
                </CarouselItem>
              </div>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="relative aspect-square w-[400px] flex-1 rounded">
          <Image
            src={selectedImage}
            alt="selected"
            className="object-cover"
            fill
            sizes="100vw"
          />
        </div>
      </div>
    </div>
  );
}
