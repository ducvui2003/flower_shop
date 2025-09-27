import { createApi } from '@reduxjs/toolkit/query/react';
import { SendReviewReqType } from '@/types/review.type';
import reviewService from '@/service/review.service';

export const reviewApi = createApi({
  reducerPath: 'reviewApi',
  tagTypes: [],
  baseQuery: () => ({ data: {} }),
  endpoints: (builder) => ({
    createReview: builder.mutation<void, SendReviewReqType>({
      async queryFn(body) {
        try {
          const result = await reviewService.createReview(body);
          return { data: result.payload };
        } catch (error: any) {
          return {
            error: {
              status: error?.status || 500,
              data: error?.message || 'Unknown error',
            },
          };
        }
      }
    }),

    editReview: builder.mutation<void, {reviewId: number, body: SendReviewReqType}>({
      async queryFn({reviewId, body}) {
        try {
          const result = await reviewService.editReview(reviewId, body);
          return { data: result.payload };
        } catch (error: any) {
          return {
            error: {
              status: error?.status || 500,
              data: error?.message || 'Unknown error',
            }
          };
        }
      }
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useEditReviewMutation
} = reviewApi
