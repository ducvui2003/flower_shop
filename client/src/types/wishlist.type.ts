type CreateWishlistReqType = {
  productId: number;
};

type WishlistResType = {
  id: number;
  product: {
    id: number;
    thumbnail?: string;
    name: string;
    basePrice: number;
    salePrice?: number;
  };
};

export type { CreateWishlistReqType, WishlistResType };
