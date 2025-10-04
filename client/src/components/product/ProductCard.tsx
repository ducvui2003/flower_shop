import Link from '@/components/Link';
import { Button } from '@/components/ui/button';
import { cn, currency } from '@/lib/utils';
import { ProductCardType } from '@/types/product.type';
import { DEFAULT_IMAGE } from '@/utils/const.util';
import TEXT from '@/utils/text.util';
import Image from 'next/image';

type ProductCardProps = ProductCardType & {};

const ProductCard = ({
  id,
  name,
  basePrice,
  salePrice,
  href,
  thumbnails,
  view = 0,
  numSell = 0,
  avgStar = 0,
  className,
}: ProductCardProps) => {
  const percentSale =
    salePrice && (((basePrice - salePrice) / basePrice) * 100).toFixed(0);
  return (
    <article
      className={cn(
        'border-primary group hover:shadow-primary relative flex flex-col overflow-hidden rounded-lg border bg-white transition-all hover:shadow-2xl',
        className,
      )}
    >
      <Link href={href}>
        <div className="pc:h-[200px] pc:mt-4 relative mt-2 h-[150px] overflow-hidden rounded-xl">
          {!Array.isArray(thumbnails) && (
            <Image
              src={thumbnails ?? DEFAULT_IMAGE}
              alt={name}
              fill
              className="rounded-xl object-cover transition-all group-hover:scale-125"
            />
          )}
        </div>
      </Link>
      {percentSale && (
        <span className="bg-primary pc:text-sm absolute top-2 right-1 rounded-full border-2 border-solid px-2 py-0.5 text-xs font-medium text-white">
          {TEXT.PRODUCT.CARD.SALE} {percentSale}%
        </span>
      )}
      <div className="pc:mt-4 pc:mb-4 mt-1 mb-2 flex flex-col items-center gap-2 px-2">
        <Link href={href} className="">
          <h3 className="o hover:text-primary mt-4 line-clamp-3 text-center text-xl font-semibold tracking-tight text-slate-900">
            {name}
          </h3>
        </Link>

        <div className="text-md pc:text-lg pc:flex-row pc:my-2 pc:gap-2 flex flex-col items-center justify-center gap-1">
          <p className="text-primary font-bold">
            {currency(salePrice || basePrice)}
          </p>
          {salePrice && (
            <p className="text-gray-400 line-through">{currency(basePrice)}</p>
          )}
        </div>
        <Button className="max-w-4/5">{TEXT.PRODUCT.CARD.BUY}</Button>
      </div>
    </article>
  );
};

export default ProductCard;
