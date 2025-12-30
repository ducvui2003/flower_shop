import http from '@/lib/http.client';
import { Page, ResponseApi } from '@/types/api.type';
import { ProductType } from '@/types/product.type';

const productService = {
  getProducts: async ({
    categoriesSlug,
    price,
  }: {
    categoriesSlug?: string[];
    price?: [
      {
        from: number;
        to: number;
      },
    ];
  }): Promise<Page<ProductType>> => {
    const data = await http.get<ResponseApi<Page<ProductType>>>(
      `/api/product/search?${categoriesSlug?.map((i) => `categoriesSlug=${i}`).join('&')}`,
    );
    return data.payload.data;
  },
};

export default productService;
