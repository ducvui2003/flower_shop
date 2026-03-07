import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ALT } from '@/utils/const.util';

import CfImage from '@/components/CfImage';
import {
  Carousel,
  CarouselContent,
  CarouselDot,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Source } from '@/types/common.type';
import { sizes } from '@/utils/format.util';

type BannerProps = {
  data: Array<Source>;
};

const Banner = ({ data }: BannerProps) => {
  return (
    <Carousel id="banner" className="relative">
      <CarouselContent>
        {data.map((item, i) => (
          <CarouselItem key={i}>
            <AspectRatio ratio={640 / 178}>
              <CfImage
                src={item.src}
                alt={item?.alt ?? ALT}
                sizes={sizes({
                  mobile: '100vw',
                  tablet: '50vw',
                  pc: '33vw',
                })}
                fill
                className="h-full w-auto object-contain object-top"
                loading="lazy"
              />
            </AspectRatio>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hover:bg-primary absolute top-1/2 left-4 -translate-y-1/2 hover:text-white" />
      <CarouselNext className="hover:bg-primary absolute top-1/2 right-4 -translate-y-1/2 hover:text-white" />
      <div className="pc:justify-center pc:bottom-5 absolute bottom-1 left-1/2 flex -translate-x-1/2 justify-end">
        <CarouselDot />
      </div>
    </Carousel>
  );
};

export default Banner;
