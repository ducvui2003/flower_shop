import httpServer from '@/lib/http.server';
import { Page, ResponseApi } from '@/types/api.type';
import { FilterDataType } from '@/types/page/product.page.type';
import { ProductDetailType, ProductType } from '@/types/product.type';

const productService = {
  getProductById: async (id: number): Promise<ProductDetailType> => {
    const res = await httpServer.get<ResponseApi<ProductDetailType>>(
      `api/v1/products/${id}`,
      undefined,
      false,
    );
    return res.payload.data;
  },

  getSitemap: async (): Promise<{ id: number; createdAt: Date }[]> => {
    const res = await httpServer.get<
      ResponseApi<{ id: number; createdAt: Date }[]>
    >(`api/v1/products/metadata/sitemap`, undefined, false);
    return res.payload.data;
  },

  getFilterData: (): Promise<FilterDataType> => {
    const categories = [
      {
        name: 'Bó hoa',
        value: 'hoa-tuoi',
      },
      {
        name: 'Lãng hoa',
        value: 'lang-hoa',
      },
      {
        name: 'Giỏ trái cây',
        value: 'gio-trai-cay',
      },
      {
        name: 'Vòng hoa',
        value: 'vong-hoa',
      },
    ];

    const prices = [
      {
        from: 0,
        to: 10000,
      },
      {
        from: 10000,
        to: 20000,
      },
    ];

    return new Promise((resolve) => {
      resolve({
        categories,
        prices,
      });
    });
  },

  getProducts: async ({
    categoriesName,
    categoryIds,
    categoriesSlug,
    price,
  }: {
    categoriesName?: string[];
    categoryIds?: number[];
    categoriesSlug?: string[];
    price?: [
      {
        from: number;
        to: number;
      },
    ];
  }): Promise<Page<ProductType>> => {
    const data = await httpServer.get<ResponseApi<Page<ProductType>>>(
      `/api/product?${categoriesSlug?.map((i) => `categoriesSlug=${i}`).join('&')}`,
    );
    return data.payload.data;
  },
  getProductBySlug: async (slug: string): Promise<ProductDetailType> => {
    const res = await httpServer.get<ResponseApi<ProductDetailType>>(
      `api/product/${slug}?type=name`,
      undefined,
      false,
    );
    return {
      ...res.payload.data,
      views: 36,
    };
  },
};

export default productService;
