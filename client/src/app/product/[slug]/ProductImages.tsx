import ProductImagesInteract from '@/app/product/[slug]/ProductImages.client';
import CfImage from '@/components/CfImage';
import { cn } from '@/lib/utils';
import { DEFAULT_IMAGE_PRODUCT } from '@/utils/const.util';
import { sizes } from '@/utils/format.util';

type ProductImagesProps = {
  images: { src: string; alt: string }[];
};

export default function ProductImages({ images }: ProductImagesProps) {
  return (
    <div className="grid grid-cols-5 gap-4">
      <div className="pc:flex-row col-span-5 flex flex-col gap-3 pl-1">
        <div className="pc:order-0 pc:min-h-[400px] pc:flex-col order-1 flex min-h-auto gap-3">
          {images.map((img, index) => (
            <div
              key={index}
              className={cn(
                'relative mt-1 size-20 hover:cursor-pointer',
                `product-image`,
              )}
            >
              <CfImage
                src={img.src}
                alt={img.alt}
                fill
                loading="lazy"
                sizes={sizes({
                  mobile: '20vw',
                  tablet: '10',
                  pc: '10vw',
                })}
                className={cn(
                  'pointer-events-none absolute inset-0 rounded bg-cover bg-center object-contain select-none',
                )}
              />
            </div>
          ))}
        </div>

        <div className="relative aspect-square flex-1">
          <CfImage
            id="product-thumbnail"
            src={images?.[0]?.src ?? DEFAULT_IMAGE_PRODUCT.src}
            alt={images?.[0]?.alt ?? DEFAULT_IMAGE_PRODUCT.alt}
            className="rounded bg-gray-100 object-contain"
            fill
            sizes="100vw"
          />
        </div>
      </div>
      <ProductImagesInteract />
    </div>
  );
}
