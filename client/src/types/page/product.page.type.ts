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
  priceOld: number;
  priceNew: number;
  images: {
    url: string;
    alt: string;
  }[];
  description: string;
  views: number;
  avgRate: number;
  tag?: { id: string; name: string }[];
};

export type { FilterDataType, ProductPageType };
