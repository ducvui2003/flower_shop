import { Link, Source } from '@/types/common';

type PageResponse<T = string> = {
  title: string;
  slug: string;
  content: T;
  createdAt: Date;
  updatedAt: Date;
};

type Product = {
  id: number;
  title: string;
  price: number;
  salePrice: number;
  thumbnail?: Source;
  link: Link;
};

type ContentMap = {
  slider: CategorySlider;
  'category-product': CategoryProduct;
};

type CategorySlider = {
  items: Array<{
    id: number;
    name: string;
    thumbnail?: Source;
    link: Link;
  }>;
};

type CategoryProduct = {
  items: Array<Product>;
  link: Link;
};

type SectionGeneric<T extends keyof ContentMap> = {
  type: T;
  title: string;
  content: ContentMap[T];
};

type HomePageContent = {
  banners: Array<Source>;
  sections: Array<SectionGeneric<keyof ContentMap>>;
};

type HomePageResponse = PageResponse<HomePageContent>;

type CategoryPageContent = {
  items: Product[];
};

type CategoryPageResponse = PageResponse<CategoryPageContent>;

type NavigateItem = {
  title: string;
  link: Link;
};

type NavigateResponse = Array<{
  title: string;
  link: Link;
  child?: Array<NavigateItem>;
}>;

export type { HomePageResponse, CategoryPageResponse, NavigateResponse };
