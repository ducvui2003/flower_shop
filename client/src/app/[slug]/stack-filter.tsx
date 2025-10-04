'use client';
import { SEARCH_MAPPING } from '@/app/[slug]/type-const';
import ClientIcon from '@/components/ClientIcon';
import TextTemplate from '@/components/TextTemplate';
import { Badge } from '@/components/ui/badge';
import { FilterDataType } from '@/types/page/product.page.type';
import { ProductSearchParamsType } from '@/types/product.type';
import { toCurrencyString } from '@/utils/format.util';
import TEXT from '@/utils/text.util';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ReactNode } from 'react';

type StackFilterProps = ProductSearchParamsType & {
  structure: FilterDataType;
};

const StackFilter = ({
  structure: { categories, prices },
  category: categoryParams,
  price: priceParams,
}: StackFilterProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const badgeCategory =
    categoryParams &&
    categories.filter((item) => categoryParams.includes(item.value));
  const badgePrice =
    priceParams &&
    prices.filter((item) => priceParams.includes(item.from + '_' + item.to));

  const handleRemove = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete(key, value);
    replace(`${pathname}?${params.toString()}`);
  };
  const handleRemoveAll = () => {
    const params = new URLSearchParams(searchParams);
    Object.values(SEARCH_MAPPING).map((value) => params.delete(value));
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex gap-2">
      {badgeCategory?.map((item) => (
        <BadgeCustom
          key={item.value}
          onRemove={() => {
            handleRemove('danh-muc', item.value);
          }}
        >
          {item.name}
        </BadgeCustom>
      ))}

      {badgePrice?.map((item) => (
        <BadgeCustom
          key={item.from}
          onRemove={() => {
            handleRemove('muc-gia', item.from + '_' + item.to);
          }}
        >
          <TextTemplate
            template={TEXT.PRODUCT_LIST.FILTER.PRICE_TEMPLATE}
            values={{
              from: toCurrencyString(item.from),
              to: toCurrencyString(item.to),
            }}
          />
        </BadgeCustom>
      ))}
      {badgeCategory?.length || badgePrice?.length ? (
        <Badge
          className="bg-red-500 hover:cursor-pointer"
          onClick={handleRemoveAll}
        >
          Xóa tất cả
        </Badge>
      ) : null}
    </div>
  );
};
type BadgeCustomProps = {
  children?: ReactNode;
  onRemove?: () => void;
};
const BadgeCustom = ({ children, onRemove }: BadgeCustomProps) => {
  return (
    <Badge className="border-primary flex items-center gap-2 bg-white text-sm text-black">
      {children}
      <ClientIcon
        className="hover:cursor-pointer"
        onClick={() => onRemove?.()}
        icon={'twemoji:cross-mark'}
        size={15}
      />
    </Badge>
  );
};

export default StackFilter;
