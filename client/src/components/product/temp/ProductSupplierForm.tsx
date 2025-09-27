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
import { useGetAllSupplierQuery } from '@/features/manager/product/product.api';
import { CreateProductBodyType } from '@/types/product.type';
import { ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';
type ProductSupplierFormProps = {
  children: ReactNode;
};

const ProductSupplierForm = () => {
  const { data } = useGetAllSupplierQuery();
  const { control } = useFormContext<CreateProductBodyType>();
  return (
    <FormField
      control={control}
      name="supplierId"
      render={({ field }) => {
        return (
          <FormItem className="border-accent rounded-md border-2 p-2">
            <FormLabel className="mb-2 block text-lg">Nhà phân phối</FormLabel>
            <Select onValueChange={field.onChange} value={String(field.value)}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {data &&
                  data.map((item) => (
                    <SelectItem key={item.id} value={item.id.toString()}>
                      {item.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default ProductSupplierForm;
