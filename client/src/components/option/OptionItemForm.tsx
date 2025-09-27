'use client';
import ClientIcon from '@/components/ClientIcon';
import Media from '@/components/media/Media';
import MediaButton from '@/components/media/MediaButton';
import ProductCategoryForm from '@/components/product/temp/ProductCategoryForm';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { currency } from '@/lib/utils';
import { MediaType } from '@/types/media.type';
import { BaseProductFormType } from '@/types/product.type';
import { useFormContext } from 'react-hook-form';
type OptionItemFormProps = {
  index: number;
  onRemove?: () => void;
};

const OptionItemForm = ({ index, onRemove }: OptionItemFormProps) => {
  const { control, setValue, getValues } =
    useFormContext<BaseProductFormType>();

  const initValueMedia = (): MediaType | null => {
    const data = getValues(`options.${index}.resource`);
    if (data) {
      return {
        id: data.id.toString(),
        publicId: data.publicId,
        url: data.url,
      };
    }
    return null;
  };
  return (
    <div className="border-accent flex items-center gap-5 rounded-md border-2 p-2">
      <Media
        multiple={false}
        previewMode
        initialValue={initValueMedia() ?? undefined}
        expose={(resources) =>
          setValue(`options.${index}.resource`, {
            id: parseInt(resources[0].id),
            publicId: resources[0].publicId,
            url: resources[0].url ?? '',
          })
        }
      />
      <div className="grid flex-1 grid-cols-3 gap-2">
        <FormField
          control={control}
          name={`options.${index}.name`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-2 block text-lg"> Tên</FormLabel>
              <FormControl>
                <Input placeholder="Vui lòng không để trống" {...field} />
              </FormControl>
              <span className="h-[25px]">
                <FormMessage />
              </span>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`options.${index}.price`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-2 block text-lg">Giá</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Vui lòng không để trống"
                  {...field}
                />
              </FormControl>
              <span className="item-center flex h-[25px] justify-between">
                <span className="text-xs text-green-400">
                  {currency(field.value)}
                </span>
                <FormMessage />
              </span>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`options.${index}.stock`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-2 block text-lg">Số lượng</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Vui lòng không để trống"
                  {...field}
                />
              </FormControl>
              <span className="h-[25px]">
                <FormMessage />
              </span>
            </FormItem>
          )}
        />
      </div>
      <ClientIcon
        icon={'meteor-icons:xmark'}
        className="border-accent bg-secondary flex self-stretch rounded-md border-2 p-2 text-red-500 hover:cursor-pointer hover:opacity-55"
        onClick={() => {
          onRemove?.();
        }}
      />
    </div>
  );
};

export default OptionItemForm;
