import {
  ResponseApi,
  ResponseApiPaging,
  PageReq,
  Paging,
} from '@/types/api.type';
import { toQueryString } from '@/lib/utils';
import {
  CommentRequest,
  CommentResponse,
  CommentUpdateRequest,
} from '@/types/comment.type';
import httpClient from '@/lib/http.client';

const commentService = {
  getCommentsByProduct: async (
    productId: number,
    req: PageReq<{}>,
  ): Promise<Paging<CommentResponse>> => {
    const params = toQueryString(req);
    const res = await httpClient.get<ResponseApiPaging<CommentResponse>>(
      `api/v1/comment/${productId}?${params}`,
      undefined,
      false,
    );
    return res.payload.data;
  },

  createComment: async (data: CommentRequest): Promise<CommentResponse> => {
    const res = await httpClient.post<ResponseApi<CommentResponse>>(
      `api/v1/comment`,
      data,
      undefined,
    );
    return res.payload.data;
  },

  updateComment: async (
    data: CommentUpdateRequest,
  ): Promise<CommentResponse> => {
    const res = await httpClient.put<ResponseApi<CommentResponse>>(
      `api/v1/comment`,
      data,
      undefined,
    );
    return res.payload.data;
  },

  deleteComment: async (
    commentId: string,
  ): Promise<ResponseApi<{ status: boolean }>> => {
    const response = await httpClient.delete<ResponseApi<{ status: boolean }>>(
      `api/v1/comment/${commentId}`,
      undefined,
      undefined,
    );
    return response.payload;
  },

  likeComment: async (commentId: string): Promise<void> => {
    await httpClient.put<ResponseApi<void>>(
      `api/v1/comment/${commentId}/like`,
      false,
      undefined,
    );
  },
};

export default commentService;
