type FilterDataType = {
  categories: {
    name: string;
    value: string;
  }[];
  prices: {
    from: number;
    to: number;
  }[];
};

type ProductPageType = {
  id: number;
  name: string;
  price: number;
  priceSale: number;
  images: {
    src: string;
    alt: string | null;
  }[];
  description: string;
  views: number;
  avgRate: number;
  tag?: { id: number; name: string; href?: string }[];
};

export type { FilterDataType, ProductPageType };
