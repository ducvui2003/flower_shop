import Link from '@/components/Link';
import { Button } from '@/components/ui/button';
import { cn, currency } from '@/lib/utils';
import { ProductCardType } from '@/types/product.type';
import { DEFAULT_IMAGE } from '@/utils/const.util';
import TEXT from '@/utils/text.util';
import Image from 'next/image';

type ProductCardProps = ProductCardType & {
  clickButton?: boolean;
};

const ProductCard = ({
  name,
  basePrice,
  salePrice,
  href,
  thumbnails,
  className,
  clickButton = false,
}: ProductCardProps) => {
  const percentSale =
    salePrice && (((basePrice - salePrice) / basePrice) * 100).toFixed(0);
  return (
    <article
      className={cn(
        'border-primary group hover:shadow-primary relative flex flex-col overflow-hidden rounded-lg border bg-white shadow transition-all hover:shadow-2xl',
        className,
      )}
    >
      <Link href={href}>
        <div className="pc:h-[250px] relative h-[150px] overflow-hidden rounded-t-lg">
          {!Array.isArray(thumbnails) && (
            <Image
              src={thumbnails ?? DEFAULT_IMAGE}
              alt={name}
              fill
              className="object-cover transition-all group-hover:scale-110"
            />
          )}
        </div>
      </Link>
      {percentSale && (
        <span className="bg-primary pc:text-sm absolute top-2 right-1 rounded-full border-2 border-solid px-2 py-0.5 text-xs font-medium text-white">
          {TEXT.PRODUCT.CARD.SALE} {percentSale}%
        </span>
      )}
      <div className="pc:py-2 mt-1 mb-2 flex flex-col items-center gap-2 px-2">
        <Link href={href}>
          <h3 className="hover:text-primary line-clamp-3 text-center text-xl font-semibold tracking-tight text-slate-900">
            {name}
          </h3>
        </Link>

        <div className="pc:text-lg pc:flex-row pc:gap-2 flex flex-col items-center justify-center gap-1 text-lg">
          <p className="text-primary font-bold">
            {currency(salePrice || basePrice)}
          </p>
          {salePrice && (
            <p className="text-gray-400 line-through">{currency(basePrice)}</p>
          )}
        </div>
        {clickButton && (
          <Link href={href} className="max-w-4/5">
            <Button>{TEXT.PRODUCT.CARD.SEE}</Button>
          </Link>
        )}
      </div>
    </article>
  );
};

export default ProductCard;
