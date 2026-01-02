import { OutputData } from "@editorjs/editorjs";

type Product = {
  id: number;
  name: string;
  price: number;
  priceSale: number;
  href: string;
  createdAt: Date;
  updatedAt: Date;
};

type Image = {
  id: number;
  key: string;
  href: string;
  alt: string;
};

type ProductEditing = {
  id: number;
  name: string;
  description: OutputData;
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
  categoryIds: Array<number>;
  metadata?: {
    title: string;
    metaDescription: string;
  };
  imageIds: Array<number>;
};

export type { Product, ProductEditing, Image };
