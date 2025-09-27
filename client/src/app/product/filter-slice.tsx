'use client';
import { CheckboxFilter } from '@/components/product/temp/CheckboxFilter';
import RadioFilter from '@/components/product/temp/RadioFilter';
import { useGetAllCategoryQuery } from '@/features/manager/product/product.api';
import { appendIfExist } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const origins: string[] = ['Pháp', 'Nhật', 'Singapore', 'Ấn Độ '];

const fragrances: string[] = [
  'Hương ấm áp',
  'Hương gỗ',
  'Hương lãng mạn',
  'Hương nâng đỡ tinh thần',
  'Hương sang trọng',
];

type KeySearching =
  | 'minPrice'
  | 'maxPrice'
  | 'categoryName'
  | 'origin'
  | 'fragrance'
  | 'priceRange';

type Range = {
  from: number;
  to: number;
};

const FilterSlice = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { data } = useGetAllCategoryQuery();

  const { replace } = useRouter();

  const hasKeyValueString = (key: KeySearching, value: string) => {
    const params = new URLSearchParams(searchParams);
    return params.has(key, value);
  };

  const handleDefaultRadioPrice = (): Range => {
    const params = new URLSearchParams(searchParams);
    const minPrice = params.get('minPrice') || '0';
    const maxPrice = params.get('maxPrice') || '0';
    return {
      from: parseInt(minPrice),
      to: parseInt(maxPrice),
    };
  };

  const handleCheckString = (
    check: boolean,
    key: KeySearching,
    value: string,
  ) => {
    const params = new URLSearchParams(searchParams);
    if (check) {
      appendIfExist(params, key, value);
    } else {
      params.delete(key, value);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleRadioPrice = (value: Range | null) => {
    const params = new URLSearchParams(searchParams);

    params.delete('minPrice');
    params.delete('maxPrice');

    if (value) {
      appendIfExist(params, 'minPrice', `${value.from}`);
      appendIfExist(params, 'maxPrice', `${value.to}`);
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="bg-[#F2F2F2] px-2">
      <div className="py-2">
        <span className="text-md mb-2 block font-bold uppercase">Giá</span>
        <RadioFilter
          defaultValue={handleDefaultRadioPrice()}
          onChecked={(rangePrice) => {
            handleRadioPrice(rangePrice);
          }}
        />
      </div>
      <span className="block h-[1px] w-full bg-black"></span>
      <div className="py-2">
        <span className="text-md mb-2 block font-bold uppercase">Xuất xứ</span>
        <div className="grid grid-cols-2 grid-rows-2">
          {origins.map((item, index) => (
            <CheckboxFilter<string>
              key={index}
              name={item}
              data={item}
              onChecked={(check, data) => {
                handleCheckString(check, 'origin', data);
              }}
              checked={hasKeyValueString('origin', item)}
            />
          ))}
        </div>
      </div>
      <span className="block h-[1px] w-full bg-black"></span>
      <div className="py-2">
        <span className="text-md mb-2 block font-bold uppercase">LOẠI</span>
        {data &&
          data.map((item, index) => (
            <CheckboxFilter<string>
              key={index}
              name={item.name}
              data={item.name}
              onChecked={(check, data) => {
                handleCheckString(check, 'categoryName', data);
              }}
              checked={hasKeyValueString('categoryName', item.name)}
            />
          ))}
      </div>
      <span className="block h-[1px] w-full bg-black"></span>
      <div className="py-2">
        <span className="text-md mb-2 block font-bold uppercase">
          MÙI HƯƠNG
        </span>
        {fragrances.map((item, index) => (
          <CheckboxFilter<string>
            key={index}
            name={item}
            data={item}
            onChecked={(check, data) => {
              handleCheckString(check, 'fragrance', data);
            }}
            checked={hasKeyValueString('fragrance', item)}
          />
        ))}
      </div>
    </div>
  );
};

export default FilterSlice;
