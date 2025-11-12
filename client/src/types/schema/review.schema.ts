import z from 'zod';
import { ratingSortKeys, RatingSortKeysType } from '@/types/review.type';

const SendReviewSchema = z.object({
  orderItemId: z.number().int().positive(),
  productId: z.number().int().positive(),
  rating: z
    .number({ required_error: 'Vui lòng chọn số sao đánh giá' })
    .int()
    .positive()
    .min(1)
    .max(5),
  content: z
    .string()
    .min(3, { message: 'Nội dung đánh giá phải tối thiểu 3 ký tự' })
    .max(500, { message: 'Nội dung đánh giá chỉ tối đa 100 ký tự' }),
});

const FilterReviewSchema = z.object({
  ratings: z.array(z.number()),
  sort: z
    .enum(ratingSortKeys as [RatingSortKeysType[number], ...RatingSortKeysType])
    .default('rating_newest')
    .optional(),
  onlyHasResponse: z.boolean().default(false).optional(),
  onlyHasBuyAgain: z.boolean().default(false).optional(),
  search: z.string().optional(),
});

export { SendReviewSchema, FilterReviewSchema };
