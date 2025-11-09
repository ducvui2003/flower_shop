'use client';
import {
  SEARCH_MAPPING,
  SORT_MAPPING,
} from '@/app/[category]/[sub-category]/type-const';
import TextTemplate from '@/components/TextTemplate';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import TEXT from '@/utils/text.util';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

type SortProps = {
  quantity?: number;
  sort?: string;
};

const Sort = ({ quantity = 0, sort: initialSort }: SortProps) => {
  const searchParams = useSearchParams();
  const [sort, setSort] = useState<string>(initialSort ?? SORT_MAPPING.asc);
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleClick = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete(SEARCH_MAPPING.sort);
    params.append(SEARCH_MAPPING.sort, value);
    replace(`${pathname}?${params.toString()}`);
    setSort(value);
  };

  return (
    <div className="pc:justify-end flex py-2">
      <span className="hidden">
        <TextTemplate
          template={TEXT.PRODUCT_LIST.SORT.QUANTITY}
          values={{ quantity: <b>{quantity}</b> }}
        />
      </span>
      <Select value={sort} onValueChange={(value) => handleClick(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sắp xếp theo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={SORT_MAPPING.asc}>
            {TEXT.PRODUCT_LIST.SORT.ASC}
          </SelectItem>
          <SelectItem value={SORT_MAPPING.desc}>
            {TEXT.PRODUCT_LIST.SORT.DESC}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Sort;
