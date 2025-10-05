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

export type { FilterDataType };
