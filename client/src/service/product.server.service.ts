import httpServer from '@/lib/http.server';
import { Page, ResponseApi } from '@/types/api.type';
import { FilterDataType } from '@/types/page/product.page.type';
import { ProductDetailType, ProductType } from '@/types/product.type';
import { sleep } from '@/utils/server.util';

const productService = {
  getProductById: async (id: number): Promise<ProductDetailType> => {
    const res = await httpServer.get<ResponseApi<ProductDetailType>>(
      `api/v1/products/${id}`,
      undefined,
      false,
    );
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
    sort = 'asc',
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
    sort?: 'asc' | 'desc';
  }): Promise<Page<ProductType>> => {
    const params = new URLSearchParams();

    if (categoriesName?.[0]) {
      params.set('name', categoriesName[0].trim().toLowerCase());
    }

    categoryIds?.forEach((id) => {
      params.append('categories', String(id));
    });

    categoriesSlug?.forEach((slug) => {
      params.append('categoriesSlug', slug);
    });

    if (price?.[0]) {
      params.set('minPrice', String(price[0].from));
      params.set('maxPrice', String(price[0].to));
    }

    params.set('sort', sort === 'desc' ? 'price_desc' : 'price_asc');

    const query = params.toString();
    const data = await httpServer.get<ResponseApi<Page<ProductType>>>(
      query ? `/product?${query}` : '/product',
    );
    await sleep(10);
    return data.payload.data;
  },
  getProductBySlug: async (slug: string): Promise<ProductDetailType> => {
    const res = await httpServer.get<ResponseApi<ProductDetailType>>(
      `/product/${slug}?type=name`,
      undefined,
      false,
    );
    return {
      ...res.payload.data,
      views: 36,
    };
  },

  getSitemap: async (): Promise<
    { id: number; slug: string; updatedAt: Date }[]
  > => {
    const res = await httpServer.get<
      ResponseApi<{ id: number; slug: string; updatedAt: Date }[]>
    >(`/product/sitemap`, undefined, false);
    return res.payload.data;
  },
};

export default productService;
