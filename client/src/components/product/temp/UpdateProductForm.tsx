'use client';
import BaseProductForm from '@/components/product/temp/BaseProductForm';
import {
  useGetDetailProductQuery,
  useUpdateProductMutation,
} from '@/features/manager/product/product.api';
import {
  BaseProductFormSchema,
  BaseProductFormType,
  UpdateProductBodyType,
} from '@/types/product.type';
import { useRouter } from 'next/navigation';
import { skip } from 'node:test';
import { toast } from 'sonner';
type UpdateProductFormProps = {
  id: number;
};

const UpdateProductForm = ({ id }: UpdateProductFormProps) => {
  const { data } = useGetDetailProductQuery(id, {
    skip: !id,
  });
  const [update] = useUpdateProductMutation();
  const router = useRouter();
  const handleSubmit = (values: BaseProductFormType) => {
    const req: UpdateProductBodyType = {
      ...values,
      thumbnailId: values.thumbnail?.id,
      resourceIds: values.resources?.map((item) => item.id),
      options: values.options?.map((item) => ({
        ...item,
        resourceId: item.resource?.id,
      })),
    };
    console.log('Update product request:', req);
    update({
      id: id,
      payload: req,
    })
      .unwrap()
      .then((response) => {
        console.log('Update response:', response);
        toast.success('Cập nhập sản phẩm thành công', {
          description: `${response.id} - ${response.name}`,
        });
        router.push('/admin/product');
      })
      .catch((error) => {
        console.error(error);
        toast.error('Cập nhập sản phẩm thất bại', {});
      });
  };

  return (
    <div>
      {data && (
        <BaseProductForm
          initialValue={BaseProductFormSchema.parse(data)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default UpdateProductForm;
