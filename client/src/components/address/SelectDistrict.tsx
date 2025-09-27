'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetDistrictsQuery } from '@/features/address/address.api';
import { setDistrict } from '@/features/address/address.slice';
import { useAppDispatch, useAppSelector } from '@/hooks/use-store';
import { uuid } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';

type District = {
  id: number;
  name: string;
  parentId: string;
};

const SelectDistrict = () => {
  const provinceId = useAppSelector((state) => state.addressSlice.province?.id);
  const { data, isFetching } = useGetDistrictsQuery(provinceId as number, {
    skip: !provinceId,
  });
  const dispatch = useAppDispatch();
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="district"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            Quận/Huyện<span className="text-red-500"> *</span>
          </FormLabel>
          <FormControl>
            <Select
              defaultValue={field.value}
              onValueChange={(value) => {
                const item = JSON.parse(value) as District;
                dispatch(
                  setDistrict({
                    id: item.id,
                    name: item.name,
                  }),
                );
                field.onChange(item.name);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chọn quận/huyện" />
              </SelectTrigger>
              <SelectContent>
                {!provinceId && (
                  <Skeleton className="h-[20px] w-full rounded-full" />
                )}
                {isFetching &&
                  Array(5)
                    .fill(null)
                    .map((_, index) => (
                      <Skeleton
                        key={index}
                        className="my-2 h-[20px] w-full rounded-full"
                      />
                    ))}
                {!isFetching &&
                  data?.map((item) => (
                    <SelectItem key={uuid()} value={JSON.stringify(item)}>
                      {item.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectDistrict;
