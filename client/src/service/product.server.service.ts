import {
  ProductCardType,
  ProductDetailRespType,
  ProductResType,
  SearchParams,
} from '@/types/product.type';
import {
  PageReq,
  Paging,
  ResponseApi,
  ResponseApiPaging,
} from '@/types/api.type';
import httpServer from '@/lib/http.server';
import { toQueryString } from '@/lib/utils';
import { FilterDataType } from '@/types/page/product.page.type';
import { DEFAULT_IMAGE } from '@/utils/const.util';
import { CategoryPageType } from '@/types/page/category.page.type';

const productService = {
  getAllProducts: async (
    req: PageReq<SearchParams>,
  ): Promise<Paging<ProductResType>> => {
    const params = toQueryString(req);
    const res = await httpServer.get<ResponseApiPaging<ProductResType>>(
      `api/v1/products/search?${params}`,
      undefined,
      false,
    );
    return res.payload.data;
  },

  getProductById: async (id: number): Promise<ProductDetailRespType> => {
    const res = await httpServer.get<ResponseApi<ProductDetailRespType>>(
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

    return new Promise((resolve, reject) => {
      resolve({
        categories,
        prices,
      });
    });
  },

  getProducts: ({}: {}): Promise<{
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
          href: '',
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

  getCategoryPage: (category: string): Promise<CategoryPageType> => {
    return new Promise((resolve) => {
      resolve({
        title: 'Hoa tươi',
        products: Array(8)
          .fill(null)
          .map((_, i) => ({
            id: i,
            basePrice: 10000,
            salePrice: 8000,
            name: 'hello123',
            slug: '/123',
            thumbnail: DEFAULT_IMAGE,
            href: '',
          })),
        moreHref: `/${category}/xem-them`,
      });
    });
  },
};

export default productService;
