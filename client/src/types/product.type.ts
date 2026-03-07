import { Link, Source } from '@/types/common.type';

type ProductSearchParamsType = {
  price?: string[];
  category?: string[];
};

type ProductType = {
  id: number;
  title: string;
  price: number;
  priceSale: number;
  thumbnail?: Source;
  href: Link;
};

type ProductDetailType = {
  id: number;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  views: number;
  category: {
    id: number;
    name: string;
  };
  supplier: {
    name: string;
  };
  images: Array<Source>;
  metadata: {
    title: string;
    metaDescription: string;
  } | null;
  createdAt: Date;
  updatedAt: Date;
};

export type { ProductType, ProductDetailType, ProductSearchParamsType };
