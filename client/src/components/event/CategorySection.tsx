import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Separator } from '@/components/ui/separator';
import { Link, Source } from '@/types/common.type';
import Image from 'next/image';
import NavLink from 'next/link';

type CategorySectionProps = {
  title: string;
  categories: { id: number; name: string; thumbnail: Source; link: Link }[];
};

const CategorySection = ({ title, categories }: CategorySectionProps) => {
  return (
    <section className="container">
      <div className="pc:justify-normal pc:gap-3 flex items-center justify-center gap-1">
        <Separator className="bg-primary flex-1" />
        <h3 className="title-section text-primary pc:max-w-none max-w-[200px]">
          {title}
        </h3>
        <Separator className="bg-primary flex-1" />
      </div>
      <Carousel className="relative mt-8 overflow-x-hidden">
        <CarouselContent>
          {categories.map((item) => {
            return (
              <CarouselItem key={item.id} className="pc:basis-1/4 basis-1/2">
                <Card {...item} href={item.link} />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="hover:bg-primary absolute top-1/2 left-4 -translate-y-1/2 hover:text-white" />
        <CarouselNext className="hover:bg-primary absolute top-1/2 right-4 -translate-y-1/2 hover:text-white" />
      </Carousel>
    </section>
  );
};

type CardProps = {
  id: number;
  name: string;
  thumbnail: Source;
  href: string;
};

const Card = ({ id, name, thumbnail, href }: CardProps) => {
  return (
    <NavLink
      href={href}
      className="group block overflow-hidden rounded-lg"
      data-id={id}
    >
      <AspectRatio ratio={3 / 4}>
        <Image
          fill
          className="object-cover transition-all group-hover:scale-110 hover:cursor-pointer"
          src={thumbnail.src}
          alt={thumbnail.alt ?? ''}
        />
        <div className="absolute bottom-0 w-full bg-black/40 py-2">
          <h3 className="text-center text-lg font-semibold text-white">
            {name}
          </h3>
        </div>
      </AspectRatio>
    </NavLink>
  );
};

export default CategorySection;
