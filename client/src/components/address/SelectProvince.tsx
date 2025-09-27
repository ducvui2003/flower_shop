'use client';
import {
  SelectTrigger,
  Select,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useGetProvincesQuery } from '@/features/address/address.api';
import { setProvince } from '@/features/address/address.slice';
import { useAppDispatch } from '@/hooks/use-store';
import { uuid } from '@/lib/utils';
import { ProvinceType } from '@/types/address.type';
import { useFormContext } from 'react-hook-form';

const SelectProvince = () => {
  const { data, isFetching } = useGetProvincesQuery();
  const dispatch = useAppDispatch();
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name="province"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            Thành phố/Tỉnh<span className="text-red-500"> *</span>
          </FormLabel>
          <FormControl>
            <Select
              defaultValue={field.value}
              onValueChange={(value) => {
                const item = JSON.parse(value) as ProvinceType;
                dispatch(
                  setProvince({
                    id: item.id,
                    name: item.name,
                  }),
                );
                field.onChange(item.name);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chọn tỉnh/thành phố" />
              </SelectTrigger>
              <SelectContent>
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

export default SelectProvince;
