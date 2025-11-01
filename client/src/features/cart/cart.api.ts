import cartService from '@/service/cart.service';
import {
  AddCartItemReqType,
  ChangeQuantityCartItemReqType,
  GetCartResType,
} from '@/types/cart.type';
import { createApi } from '@reduxjs/toolkit/query/react';

export const cartApi = createApi({
  reducerPath: 'cartApi',
  tagTypes: ['Cart'],
  baseQuery: () => ({ data: {} }),
  endpoints: (builder) => ({
    getCart: builder.query<GetCartResType, void>({
      async queryFn() {
        try {
          const data = await cartService.getCart();
          return { data };
        } catch (error: any) {
          return {
            error: {
              status: error?.status || 500,
              data: error?.message || 'Unknown error',
            },
          };
        }
      },
      providesTags: ['Cart'],
    }),

    addCartItem: builder.mutation<void, AddCartItemReqType>({
      async queryFn(body) {
        try {
          const result = await cartService.addCartItem(body);
          return { data: result.payload };
        } catch (error: any) {
          return {
            error: {
              status: error?.status || 500,
              data: error?.message || 'Unknown error',
            },
          };
        }
      },
      invalidatesTags: ['Cart'],
    }),

    changeQuantityCartItem: builder.mutation<
      void,
      { cartItemId: string; body: ChangeQuantityCartItemReqType }
    >({
      async queryFn({ cartItemId, body }) {
        try {
          const result = await cartService.changeQuantityCartItem(
            cartItemId,
            body,
          );
          return { data: result.payload };
        } catch (error: any) {
          return {
            error: {
              status: error?.status || 500,
              data: error?.message || 'Unknown error',
            },
          };
        }
      },
      invalidatesTags: ['Cart'],
    }),

    toggleCartItem: builder.mutation<void, string | 'all'>({
      async queryFn(cartItemId) {
        try {
          const result = await cartService.toggleCartItem(cartItemId);
          return { data: result.payload };
        } catch (error: any) {
          return {
            error: {
              status: error?.status || 500,
              data: error?.message || 'Unknown error',
            },
          };
        }
      },
      invalidatesTags: ['Cart'],
    }),

    deleteCartItem: builder.mutation<void, string>({
      async queryFn(cartItemId) {
        try {
          const result = await cartService.deleteCartItem(cartItemId);
          return { data: result.payload };
        } catch (error: any) {
          return {
            error: {
              status: error?.status || 500,
              data: error?.message || 'Unknown error',
            },
          };
        }
      },
      invalidatesTags: ['Cart'],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddCartItemMutation,
  useToggleCartItemMutation,
  useChangeQuantityCartItemMutation,
  useDeleteCartItemMutation,
} = cartApi;
