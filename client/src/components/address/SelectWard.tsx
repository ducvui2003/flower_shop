'use client';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetWardsQuery } from '@/features/address/address.api';
import { setWard } from '@/features/address/address.slice';
import { useAppDispatch, useAppSelector } from '@/hooks/use-store';
import { uuid } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';

type Ward = {
  id: number;
  name: string;
  parentId: string;
};
const SelectWard = () => {
  const districtId = useAppSelector((state) => state.addressSlice.district?.id);
  const { data, isFetching } = useGetWardsQuery(districtId as number, {
    skip: !districtId,
  });
  const dispatch = useAppDispatch();
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="ward"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            Phường/Xã<span className="text-red-500"> *</span>
          </FormLabel>
          <FormControl>
            <Select
              defaultValue={field.value}
              onValueChange={(value) => {
                const item = JSON.parse(value) as Ward;
                dispatch(
                  setWard({
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
                {!districtId && (
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
                {data &&
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

export default SelectWard;
