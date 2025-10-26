import { PageReq, ResponseApi } from '@/types/api.type';
import { toQueryString } from '@/lib/utils';
import {
  FilterReviewQueryType,
  GetReviewsOfProductResType,
} from '@/types/review.type';
import httpClient from '@/lib/http.client';
import { ProductCardType } from '@/types/product.type';
import { DEFAULT_IMAGE } from '@/utils/const.util';

const productService = {
  getReviewsOfProduct: async (
    productId: number,
    query: PageReq<FilterReviewQueryType>,
  ): Promise<GetReviewsOfProductResType> => {
    const res = await httpClient.get<ResponseApi<GetReviewsOfProductResType>>(
      `api/v1/products/${productId}/reviews?${toQueryString(query)}`,
      undefined,
      false,
    );
    return res.payload.data;
  },

  getProducts: ({
    category,
    price,
  }: {
    category?: string[];
    price?: [
      {
        from: number;
        to: number;
      },
    ];
  }): Promise<{
    items: ProductCardType[];
    paging: {
      page: number;
      total: number;
    };
  }> => {
    const products = {
      items: Array(8)
        .fill(null)
        .map((_, i) => ({
          id: i,
          basePrice: 10000,
          salePrice: 8000,
          name: 'hello123',
          slug: '/123',
          thumbnail: DEFAULT_IMAGE,
          href: '/hoa-tot-nghiep/tot-nghiep/hoa-hong',
        })),
      paging: {
        page: 1,
        total: 3,
      },
    };
    return new Promise((resolve, reject) => {
      resolve(products);
    });
  },
};

export default productService;
