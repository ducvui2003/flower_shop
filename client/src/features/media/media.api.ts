import mediaService from '@/service/media.service';
import { PageReq, Paging } from '@/types/api.type';
import { MediaSearchParams, PagingMediaType } from '@/types/media.type';
import { createApi } from '@reduxjs/toolkit/query/react';
export const mediaApi = createApi({
  reducerPath: 'mediaApi', // name field of redux state
  baseQuery: () => ({ data: {} }),
  endpoints: (builder) => ({
    getPagingMedia: builder.query<
      Paging<PagingMediaType>,
      PageReq<MediaSearchParams>
    >({
      async queryFn(paging) {
        try {
          const data = await mediaService.getMedia(paging);
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
    }),
  }),
});
export const { useGetPagingMediaQuery, useLazyGetPagingMediaQuery } = mediaApi;
