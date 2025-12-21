type Product = {
  id: number;
  name: string;
  price: number;
  priceSale: number;
  href: string;
  createdAt: Date;
  updatedAt: Date;
};

type ProductEditing = {
  id: number;
  name: string;
  description: string;
  price: number;
  priceSale: number;
  slugRegistryId: number;
  slugPlaceholder: string;
  createdBy: string | null;
  createdAt: Date | null;
  updatedBy: string | null;
  updatedAt: Date | null;
  isDeleted: boolean;
  deletedBy: string | null;
  deletedAt: Date | null;
  slug: {
    id: number;
    slug: string;
  };
  categories: Array<{
    categoryId: number;
    createdAt: Date;
  }>;
  metadata?: {
    title: string;
    metaDescription: string;
  };
};

export type { Product, ProductEditing };
