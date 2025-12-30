type Link = string;
type Source = {
  src: string;
  alt: string | null;
};
type PageResponse<T = string> = {
  title: string;
  slug: string;
  content: T;
};

type Product = {
  id: number;
  title: string;
  price: number;
  priceSale: number;
  thumbnail?: Source;
  href: Link;
};

type ContentMap = {
  banner: Array<Source>;
  categorySlider: CategorySlider;
  categoryProduct: CategoryProduct;
};

type SectionGeneric<T extends keyof ContentMap> = {
  type: T;
  title: string;
  content: ContentMap[T];
};

type SectionBanner = SectionGeneric<'banner'>;
type SectionCategorySlider = SectionGeneric<'categorySlider'>;
type SectionCategoryProduct = SectionGeneric<'categoryProduct'>;

type CategorySlider = Array<{
  id: number;
  name: string;
  thumbnail?: Source;
  href: Link;
}>;

type CategoryProduct = {
  items: Array<Product>;
  href: Link;
};

type HomePageResponse = PageResponse<Array<SectionGeneric<keyof ContentMap>>>;

type CategoryPageContent = {
  id: number;
  thumbnail?: Source;
};

type CategoryPageResponse = PageResponse<CategoryPageContent>;

type NavigateItem = {
  title: string;
  href: Link;
};

type NavigateResponse = Array<{
  title: string;
  href: Link;
  child?: Array<NavigateItem>;
}>;

export type {
  HomePageResponse,
  CategoryPageResponse,
  NavigateResponse,
  CategorySlider,
  //Sections
  SectionBanner,
  SectionCategorySlider,
  SectionCategoryProduct,
  // Category
  CategoryPageContent,
};
