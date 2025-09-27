import { StatusOrderType } from '@/utils/const.util';
import { z } from 'zod';

type DashboardResType = {
  stats: {
    total: {
      user: number;
      order: Record<StatusOrderType, number>;
      revenue: number;
      product: number;
    };
    revenueTrend: Array<{
      month: string;
      revenue: number;
    }>;
    orderTrendInWeekly: Array<{
      day: string;
      count: number;
    }>;
  };
};

const RevenueByTimeRequestSchema = z.object({
  from: z.coerce.date(),
  to: z.coerce.date(),
});
type RevenueByTimeRequestType = z.infer<typeof RevenueByTimeRequestSchema>;

type RevenueByTimeResponseType = Array<{
  month: string;
  revenue: number;
}>;

type RevenueByTimeAndCategoryResponseType = Array<{
  category: string;
  revenue: number;
}>;

const RevenueByTimeAndCategoryRequestSchema = z.object({
  month: z
    .string()
    .transform(Number)
    .refine((m) => m >= 1 && m <= 12, {
      message: 'Month must be between 1 and 12',
    }),
  year: z
    .string()
    .transform(Number)
    .refine((y) => y >= 2000 && y <= 2100, {
      message: 'Year must be a valid year',
    }),
});

type RevenueByTimeAndCategoryRequestType = z.infer<
  typeof RevenueByTimeAndCategoryRequestSchema
>;

export type {
  DashboardResType,
  RevenueByTimeRequestType,
  RevenueByTimeAndCategoryResponseType,
  RevenueByTimeResponseType,
  RevenueByTimeAndCategoryRequestType,
};
