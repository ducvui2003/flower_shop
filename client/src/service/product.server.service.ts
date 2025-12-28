import httpServer from '@/lib/http.server';
import { ResponseApi } from '@/types/api.type';
import { CategoryPageType } from '@/types/page/category.page.type';
import {
  FilterDataType,
  ProductPageType,
} from '@/types/page/product.page.type';
import { ProductCardType, ProductDetailRespType } from '@/types/product.type';
import { DEFAULT_IMAGE_PRODUCT } from '@/utils/const.util';

const productService = {
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

    return new Promise((resolve) => {
      resolve({
        categories,
        prices,
      });
    });
  },

  getProducts: ({
    category,
    categoryId,
    price,
    paging,
  }: {
    category?: string[];
    categoryId?: number[];
    price?: [
      {
        from: number;
        to: number;
      },
    ];
    paging?: {
      page: number;
      size: number;
    };
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
          thumbnail: DEFAULT_IMAGE_PRODUCT,
          link: '/hoa-tot-nghiep/tot-nghiep/hoa-hong',
        })),
      paging: {
        page: 1,
        total: 3,
      },
    };
    return new Promise((resolve) => {
      resolve(products);
    });
  },

  getCategoryPage: (category: string): Promise<CategoryPageType | null> => {
    if (category === 'sinh-nhat') {
      return Promise.resolve({
        title: 'Hoa sinh nhật',
        thumbnail: DEFAULT_IMAGE_PRODUCT,
      });
    }
    if (category !== 'hoa-tuoi') return Promise.resolve(null);
    return new Promise((resolve) => {
      resolve({
        title: 'Hoa tươi',
        thumbnail: DEFAULT_IMAGE_PRODUCT,
      });
    });
  },

  getProductBySlug: async (slug: string): Promise<ProductPageType> => {
    const res = await httpServer.get<
      ResponseApi<{
        id: number;
        name: string;
        price: number;
        priceSale: number;
        description: string;
        href: string;
        images: Array<{
          src: string;
          alt: string | null;
        }>;
      }>
    >(`api/product/${slug}?type=name`, undefined, false);
    return {
      ...res.payload.data,
      views: 36,
      avgRate: 5,
      tag: [
        {
          id: 1,
          name: 'Hoa tuoi dam cuoi',
          href: '/hoa-tuoi-dam-cuoi',
        },
        {
          id: 2,
          name: 'Hoa tuoi dam cuoi',
          href: '/hoa-tuoi-dam-cuoi',
        },
      ],
    };
  },
};

export default productService;
