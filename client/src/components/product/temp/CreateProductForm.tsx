'use client';
import BaseProductForm from '@/components/product/temp/BaseProductForm';
import { useCreateProductMutation } from '@/features/manager/product/product.api';
import {
  BaseProductFormType,
  CreateProductBodySchema,
  CreateProductBodyType,
} from '@/types/product.type';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const CreateProductForm = () => {
  const router = useRouter();
  const [create] = useCreateProductMutation();
  const handleSubmit = (values: BaseProductFormType) => {
    const req: CreateProductBodyType = CreateProductBodySchema.parse({
      ...values,
      thumbnailId: values.thumbnail?.id,
      resourceIds: values.resources?.map((item) => item.id),
      options: values.options?.map((item) => ({
        ...item,
        resourceId: item.resource?.id,
      })),
    });
    create(req)
      .unwrap()
      .then((response) => {
        toast.success('Tạo sản phẩm thành công', {
          description: `${response.id} - ${response.name}`,
        });
        router.push('/admin/product');
      })
      .catch((error) => {
        console.error(error);
        toast.error('Tạo sản phẩm thất bại', {});
      });
  };
  return (
    <>
      <BaseProductForm onSubmit={handleSubmit} />
    </>
  );
};

export default CreateProductForm;
