type CategoryPageType = {
  title: string;
  thumbnail: string;
};

type SubCategoryPageType = {
  title: string;
  parent: {
    name: string;
    href: string;
  };
  thumbnail: string;
};

export type { CategoryPageType, SubCategoryPageType };
