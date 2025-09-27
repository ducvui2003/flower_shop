'use client';
import { useEffect, useState } from 'react';

import Editor from '@/components/Editor';
import ListView from '@/components/ListView';
import Media from '@/components/media/Media';
import MediaCard from '@/components/media/MediaCard';
import OptionForm from '@/components/option/OptionForm';
import ProductCategoryForm from '@/components/product/temp/ProductCategoryForm';
import ProductSupplierForm from '@/components/product/temp/ProductSupplierForm';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { currency } from '@/lib/utils';
import { MediaType } from '@/types/media.type';
import {
  BaseProductFormSchema,
  BaseProductFormType,
} from '@/types/product.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

type BaseProductFormProp = {
  initialValue?: BaseProductFormType;
  onSubmit: (values: BaseProductFormType) => void;
};

const BaseProductForm = ({
  initialValue,
  onSubmit: handleSubmit,
}: BaseProductFormProp) => {
  const form = useForm<BaseProductFormType>({
    resolver: zodResolver(BaseProductFormSchema),
    defaultValues: initialValue ?? {
      name: '',
      basePrice: 0,
      salePrice: undefined,
      supplierId: 0,
      categoryId: 0,
      description: '',
      thumbnail: undefined,
      resources: [],
      options: undefined,
      isDeleted: false,
    },
  });

  useEffect(() => {
    if (Object.keys(form.formState.errors).length > 0) {
      console.log('❌ Form Errors:', form.formState.errors);

      // Optional: log each field error
      Object.entries(form.formState.errors).forEach(([fieldName, error]) => {
        console.log(`Field "${fieldName}" has error:`, error?.message);
      });
    }
  }, [form.formState.errors]);

  const [medias, setMedias] = useState<MediaType[]>(
    initialValue?.resources?.map((item) => {
      return {
        id: item.id.toString(),
        publicId: item.publicId,
        url: item.url,
      };
    }) ?? [],
  );

  const initValueThumbnail = (): MediaType | null => {
    const data = form.getValues('thumbnail');
    if (data) {
      return {
        id: data.id.toString(),
        publicId: data.publicId,
        url: data.url,
      };
    }
    return null;
  };

  const { isSubmitting } = form.formState;

  const onSubmit = (values: BaseProductFormType) => {
    handleSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <div className="flex gap-4">
          <div className="flex flex-1 flex-col gap-4">
            <div className="flex gap-4">
              <Media
                multiple={false}
                previewMode
                initialValue={initValueThumbnail() ?? undefined}
                className="size-[150px] basis-[150px]"
                expose={(resources) => {
                  form.setValue(
                    'thumbnail',
                    resources?.[0]
                      ? {
                          id: parseInt(resources[0].id),
                          publicId: resources[0].publicId,
                          url: resources[0].url ?? '',
                        }
                      : undefined,
                  );
                }}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="border-accent flex-1 rounded-md border-2 p-2">
                    <FormLabel className="mb-2 block text-lg">
                      Tên sản phẩm
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Vui lòng không để trống" {...field} />
                    </FormControl>
                    <span className="h-[25px]">
                      <FormMessage />
                    </span>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="border-accent rounded-md border-2 p-2">
                  <FormLabel className="mb-2 block text-lg">Mô tả</FormLabel>
                  <FormControl>
                    <Editor
                      {...field}
                      classNameContainer="h-[200px] rounded-md border shadow-sm"
                    />
                  </FormControl>

                  <FormMessage />
                  <span className="block text-right"></span>
                </FormItem>
              )}
            />
            <FormItem className="border-accent rounded-md border-2 p-2">
              <FormLabel className="mb-2 block text-lg">Hình ảnh</FormLabel>

              <ListView<MediaType>
                data={medias}
                display="grid"
                className="grid-cols-7 gap-2"
                render={(item) => {
                  return (
                    <MediaCard
                      className="size-[100px]"
                      key={item.id}
                      url={item.url ?? ''}
                    />
                  );
                }}
                emptyComponent={null}
                append={
                  <Media
                    multiple
                    initialValue={medias}
                    expose={(mediaState) => {
                      form.setValue(
                        'resources',
                        mediaState.map((item) => {
                          return {
                            id: parseInt(item.id),
                            publicId: item.publicId,
                            url: item.url ?? '',
                          };
                        }),
                      );
                      setMedias([...mediaState]);
                    }}
                    className="size-[100px]"
                  />
                }
              />
            </FormItem>

            <OptionForm />
          </div>
          <div className="flex basis-[300px] flex-col gap-4">
            {/* isDeleted */}
            <FormField
              control={form.control}
              name="isDeleted"
              render={({ field }) => {
                return (
                  <FormItem className="border-accent rounded-md border-2 p-2">
                    <FormLabel className="mb-2 block text-lg">
                      Trạng thái
                    </FormLabel>
                    <Select
                      onValueChange={(value) =>
                        field.onChange(value === 'true')
                      }
                      value={String(field.value?.toString())}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Trạng thái" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="false">Đang bán</SelectItem>
                        <SelectItem value="true">Đóng</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            {/* Price */}
            <div className="border-accent rounded-md border-2 p-2">
              <FormField
                control={form.control}
                name="basePrice"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="mb-2 block">Giá gốc</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Vui lòng không để trống"
                        {...field}
                        value={field.value.toString()}
                        onChange={(event) =>
                          form.setValue('basePrice', event.target.valueAsNumber)
                        }
                      />
                    </FormControl>
                    <div className="text-xs text-green-400">
                      {currency(field.value)}
                    </div>
                    <span className="item-center flex h-[25px] justify-between">
                      <FormMessage />
                    </span>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="salePrice"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel className="mb-2 block">Giá giảm</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(event) =>
                          form.setValue('salePrice', event.target.valueAsNumber)
                        }
                      />
                    </FormControl>
                    <div className="text-xs text-green-400">
                      {currency(field.value ?? 0)}
                    </div>
                    <span className="item-center flex h-[25px] justify-between">
                      <FormMessage />
                    </span>
                  </FormItem>
                )}
              />
            </div>
            <ProductSupplierForm />
            <ProductCategoryForm />
            <Button
              className="w-full"
              type="submit"
              disabled={isSubmitting}
              loading={isSubmitting}
            >
              Tạo sản phẩm
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default BaseProductForm;
