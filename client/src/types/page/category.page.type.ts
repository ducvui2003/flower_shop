import { ProductCardType } from '@/types/product.type';

type CategoryPageType = {
  title: string;
  products: ProductCardType[];
  moreHref: string;
};

export type { CategoryPageType };
