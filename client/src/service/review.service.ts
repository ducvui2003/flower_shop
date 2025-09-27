import { SendReviewReqType } from '@/types/review.type';
import http from '@/lib/http.client';

const ReviewService = {
  createReview: async (body: SendReviewReqType) =>
    await http.post<void>('/api/v1/reviews', body),
  editReview: async (reviewId: number, body: SendReviewReqType) =>
    await http.put<void>(`/api/v1/reviews/${reviewId}`, body),
};

export default ReviewService;
