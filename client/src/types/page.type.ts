import { Link, Source } from '@/types/common.type';

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
    thumbnail: Source;
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

// type CategoryPageContent ={};

// type CategoryPage = PageResponse<>;

type PageHomeResponse = PageResponse<HomePageContent>;

export type { PageHomeResponse, CategorySlider, CategoryProduct };
