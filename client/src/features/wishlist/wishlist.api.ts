import wishlistService from '@/service/wishlist.service';
import { CreateWishlistReqType, WishlistResType } from '@/types/wishlist.type';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

export const wishlistApi = createApi({
  reducerPath: 'wishlistApi',
  tagTypes: ['Wishlist'],
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    findAllWishlists: builder.query<Array<WishlistResType> | null, void>({
      async queryFn() {
        try {
          const data = await wishlistService.findAll();
          return { data: data ?? null };
        } catch (error: any) {
          return {
            error: {
              status: error?.status || 500,
              data: error?.message || 'Unknown error',
            },
          };
        }
      },
      providesTags(result) {
        if (result) {
          const final = [
            ...result.map((item) => ({
              type: 'Wishlist' as const,
              id: item.id,
            })),
            {
              type: 'Wishlist' as const,
              id: 'LIST',
            },
          ];
          return final;
        }
        const final = [
          {
            type: 'Wishlist' as const,
            id: 'LIST',
          },
        ];
        return final;
      },
    }),

    createWishlist: builder.mutation<null, CreateWishlistReqType>({
      async queryFn(body) {
        try {
          await wishlistService.create(body);
          return {
            data: null,
          };
        } catch (error: any) {
          return {
            error: {
              status: error?.status || 500,
              data: error?.payload || error?.message || 'Unknown error',
            },
          };
        }
      },
      invalidatesTags: ['Wishlist'],
    }),

    deleteWishlist: builder.mutation<null, number>({
      async queryFn(body) {
        try {
          await wishlistService.delete(body);
          return {
            data: null,
          };
        } catch (error: any) {
          return {
            error: {
              status: error?.status || 500,
              data: error?.payload || error?.message || 'Unknown error',
            },
          };
        }
      },
      invalidatesTags: (_, __, id) => [{ type: 'Wishlist', id }],
    }),
  }),
});

export const {
  useCreateWishlistMutation,
  useDeleteWishlistMutation,
  useFindAllWishlistsQuery,
} = wishlistApi;
