import { cn, currency } from '@/lib/utils';
import { ProductCardType } from '@/types/product.type';
import Image from 'next/image';
import React from 'react';
import { StarRating } from '@/components/StartRating';
import Link from '@/components/Link';
import { DEFAULT_IMAGE } from '@/utils/const.util';

type ProductCardProps = ProductCardType & {
  className?: string;
};

const ProductCard = ({
  id,
  thumbnail,
  name,
  basePrice,
  salePrice,
  avgStar,
  numSell,
  className,
}: ProductCardProps) => {
  const percentSale =
    salePrice && (((basePrice - salePrice) / basePrice) * 100).toFixed(1);
  return (
    <div
      className={cn(
        'relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md',
        className,
      )}
    >
      <div className="relative mx-3 mt-3 h-60 overflow-hidden rounded-xl">
        <Image
          src={thumbnail ?? DEFAULT_IMAGE}
          alt={name}
          fill
          className="rounded-xl object-cover"
        />
        {percentSale && (
          <span className="absolute top-2 left-2 rounded-full bg-[#FFAB66D1] px-2 py-0.5 text-sm font-medium text-white">
            {percentSale}% OFF
          </span>
        )}
      </div>

      <div className="mt-4 px-5 pb-5">
        <Link href={`/product/detail/${id}`} className="hover:underline">
          <h5 className="text-md o line-clamp-3 h-[80px] text-center font-semibold tracking-tight text-slate-900">
            {name}
          </h5>
        </Link>

        <div className="mt-2 mb-2 flex items-center gap-2">
          <span className="text-md font-bold text-red-600">
            {currency(salePrice || basePrice)}
          </span>
          {salePrice && (
            <span className="text-sm text-gray-400 line-through">
              {currency(basePrice)}
            </span>
          )}
        </div>
        <StarRating star={avgStar} />
        <span className="text-gray-600">
          {avgStar} | Đã bán {numSell}
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
