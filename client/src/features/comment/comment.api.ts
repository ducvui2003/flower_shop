import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  CommentRequest,
  CommentResponse,
  CommentUpdateRequest,
} from '@/types/comment.type';
import commentService from '@/service/comment.service';
import { PageReq, Paging } from '@/types/api.type';

export const commentApi = createApi({
  reducerPath: 'comment',
  tagTypes: ['Comment'],
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getCommentsByProduct: builder.query<
      Paging<CommentResponse>,
      { productId: number; req: PageReq<object> }
    >({
      async queryFn({ productId, req }) {
        try {
          const comments = await commentService.getCommentsByProduct(
            productId,
            req,
          );
          return { data: comments };
        } catch (error: any) {
          return {
            error: {
              status: error?.status || 500,
              data: error?.payload || error?.message || 'Unknown error',
            },
          };
        }
      },
      providesTags: ['Comment'],
    }),

    createComment: builder.mutation<CommentResponse, CommentRequest>({
      async queryFn(body) {
        try {
          const comment = await commentService.createComment(body);
          return { data: comment };
        } catch (error: any) {
          return {
            error: {
              status: error?.status || 500,
              data: error?.payload || error?.message || 'Unknown error',
            },
          };
        }
      },
      invalidatesTags: ['Comment'],
    }),
    updateComment: builder.mutation<CommentResponse, CommentUpdateRequest>({
      async queryFn(body: CommentUpdateRequest) {
        try {
          const comment = await commentService.updateComment(body);
          return { data: comment };
        } catch (error: any) {
          return {
            error: {
              status: error?.status || 500,
              data: error?.payload || error?.message || 'Unknown error',
            },
          };
        }
      },
      invalidatesTags: ['Comment'],
    }),
    likeComment: builder.mutation<void, { commentId: string }>({
      async queryFn({ commentId }) {
        try {
          const response = await commentService.likeComment(commentId);
          return { data: response };
        } catch (error: any) {
          return {
            error: {
              status: error?.status || 500,
              data: error?.payload || error?.message || 'Unknown error',
            },
          };
        }
      },
      invalidatesTags: ['Comment'],
    }),
  }),
});

export const {
  useGetCommentsByProductQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useLikeCommentMutation,
} = commentApi;
