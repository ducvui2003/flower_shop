'use client';
import {
  SEARCH_MAPPING,
  SORT_MAPPING,
} from '@/app/[category]/[sub-category]/type-const';
import TextTemplate from '@/components/TextTemplate';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import TEXT from '@/utils/text.util';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
type SortProps = {
  quantity?: number;
  sort?: string;
};

const Sort = ({ quantity = 0, sort }: SortProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleClick = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete(SEARCH_MAPPING.sort);
    params.append(SEARCH_MAPPING.sort, value);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex py-2">
      <span className="hidden">
        <TextTemplate
          template={TEXT.PRODUCT_LIST.SORT.QUANTITY}
          values={{ quantity: <b>{quantity}</b> }}
        />
      </span>
      <span
        className={cn(
          'text-md ml-auto',
          sort === SORT_MAPPING.asc
            ? 'text-primary'
            : 'hover:text-primary text-gray-500 hover:cursor-pointer',
        )}
        onClick={() => SORT_MAPPING.desc && handleClick(SORT_MAPPING.asc)}
      >
        {TEXT.PRODUCT_LIST.SORT.ASC}
      </span>
      <span className="mx-4 w-[1px] bg-gray-400"></span>
      <span
        className={cn(
          'text-md',
          sort === SORT_MAPPING.desc
            ? 'text-primary'
            : 'hover:text-primary text-gray-500 hover:cursor-pointer',
        )}
        onClick={() => SORT_MAPPING.asc && handleClick(SORT_MAPPING.desc)}
      >
        {TEXT.PRODUCT_LIST.SORT.DESC}
      </span>
    </div>
  );
};

export default Sort;
