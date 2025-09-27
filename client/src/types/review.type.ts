import z from 'zod';
import {
  FilterReviewSchema,
  SendReviewSchema,
} from '@/types/schema/review.schema';
import { Paging } from '@/types/api.type';
import { OrderDetailItemType } from '@/types/order.type';

type SendReviewReqType = z.infer<typeof SendReviewSchema>;

type ReviewItemType = {
  id: number;
  content: string;
  rating: number;
  userId: number;
  productId: number;
  orderItemId: number;
  response: string | null;
  user: {
    name: string;
    avatar: string;
  };
} & Pick<OrderDetailItemType, 'options'>;

export const ratingSort = {
  rating_newest: 'Đánh giá: Mới nhất',
  rating_oldest: 'Đánh giá: Cũ Nhất',
  rating_desc: 'Đánh giá: Cao đến thấp',
  rating_asc: 'Đánh giá: Thấp đến cao',
} as const;

export const feeling: { [key: number]: string } = {
  1: 'Rất Tệ',
  2: 'Không tốt',
  3: 'Bình thường',
  4: 'Hài lòng',
  5: 'Tuyệt vời',
} as const;

export const ratingSortKeys = Object.keys(ratingSort) as Array<
  keyof typeof ratingSort
>;

type RatingSortKeysType = typeof ratingSortKeys;

type FilterReviewQueryType = z.infer<typeof FilterReviewSchema>;

type GetReviewsOfProductResType = Paging<ReviewItemType> & {
  averageRating: number;
  ratingStars: Record<number, number>;
};

type GetReviewOfOrderItemResType = Pick<
  Paging<ReviewItemType>['items'][number],
  'orderItemId' | 'id' | 'rating' | 'content' | 'createdAt' | 'updatedAt'
>;

export type {
  SendReviewReqType,
  GetReviewsOfProductResType,
  GetReviewOfOrderItemResType,
  ReviewItemType,
  FilterReviewQueryType,
  RatingSortKeysType,
};
