import z from 'zod';
import {
  AddCartItemSchema,
  ChangeQuantityCartItemSchema,
} from '@/types/schema/cart.schema';

type GetCartResType = {
  id: number;
  userId: number;
  temporaryTotalPrice: number;
  cartItems: {
    id: string;
    quantity: number;
    selected: boolean;
    thumbnail: string;
    product: {
      id: number;
      name: string;
      basePrice: number;
      salePrice: number;
    };
    option?: {
      id: number;
      name: string;
      price: number;
    };
  }[];
};

type AddCartItemReqType = z.infer<typeof AddCartItemSchema>;

type ChangeQuantityCartItemReqType = z.infer<
  typeof ChangeQuantityCartItemSchema
>;

export type {
  AddCartItemReqType,
  ChangeQuantityCartItemReqType,
  GetCartResType,
};
