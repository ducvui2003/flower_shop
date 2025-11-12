import httpServer from '@/lib/http.server';
import { ResponseApi } from '@/types/api.type';
import {
  CategoryPageType,
  SubCategoryPageType,
} from '@/types/page/category.page.type';
import {
  FilterDataType,
  ProductPageType,
} from '@/types/page/product.page.type';
import { ProductCardType, ProductDetailRespType } from '@/types/product.type';
import { DEFAULT_IMAGE } from '@/utils/const.util';

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
          thumbnail: DEFAULT_IMAGE,
          href: '/hoa-tot-nghiep/tot-nghiep/hoa-hong',
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
    if (category !== 'hoa-tuoi') return Promise.resolve(null);
    return new Promise((resolve) => {
      resolve({
        title: 'Hoa tươi',
        thumbnail: DEFAULT_IMAGE,
      });
    });
  },

  getSubCategoryPage: (
    category: string,
    subCategory: string,
  ): Promise<SubCategoryPageType> => {
    return new Promise((resolve) => {
      resolve({
        title: 'Hoa sinh nhật',
        thumbnail: DEFAULT_IMAGE,
        parent: {
          name: 'Chủ đề',
          href: '/chu-de',
        },
      });
    });
  },

  getProductBySlug: (slug: string): Promise<ProductPageType> => {
    const data: ProductPageType = {
      id: 1,
      name: 'Say Ánh Mắt',
      priceOld: 200000,
      priceNew: 190000,
      images: [
        {
          url: 'https://flowercorner.b-cdn.net/image/cache/catalog/products/Winter_2024/say-anh-mat.jpg',
          alt: 'say-anh-mat',
        },
        {
          url: 'https://flowercorner.b-cdn.net/image/cache/catalog/products/August%202023/bo-hoa-hong-pastel-khoe-sac.jpg',
          alt: 'say-anh-mat1',
        },
      ],
      description:
        '<p><strong>Bó hoa Say Ánh Mắt được thiết kế từ:</strong></p>\n<ul>\n<li>Hoa thạch thảo trắng: 1 bó</li>\n<li>Hoa hồng kem: 1 cành</li>\n<li>Các loại hoa lá phụ trang trí khác: Cỏ đồng tiền</li>\n</ul>\n<p>Lưu ý:</p>\n<p>**Do được làm thủ công, nên sản phẩm ngoài thực tế sẽ có đôi chút khác biệt so với hình ảnh trên website. Tuy nhiên, Flowercorner cam kết hoa sẽ giống khoảng 80% so với hình ảnh.</p>\n<p>** Vì các loại hoa lá phụ sẽ có tùy vào thời điểm trong năm, Flowercorner đảm bảo các loại hoa chính, các loại hoa lá phụ sẽ thay đổi phù hợp giá cả và thiết kế sản phẩm.</p>',
      avgRate: 5,
      views: 36,
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

    return Promise.resolve(data);
  },
};

export default productService;
