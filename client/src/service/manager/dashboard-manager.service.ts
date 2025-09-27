import http from '@/lib/http.client';
import { ResponseApi } from '@/types/api.type';
import {
  RevenueByTimeAndCategoryRequestType,
  RevenueByTimeAndCategoryResponseType,
  RevenueByTimeRequestType,
  RevenueByTimeResponseType,
} from '@/types/dashboard.type';

const dashboardService = {
  getRevenueByTime: async (req: RevenueByTimeRequestType) => {
    const res = await http.post<ResponseApi<RevenueByTimeResponseType | null>>(
      `api/v1/manager/dashboard/revenue-by-time`,
      req,
    );
    return res.payload.data;
  },
  getRevenueByTimeAndCategory: async (
    req: RevenueByTimeAndCategoryRequestType,
  ) => {
    const res = await http.post<
      ResponseApi<RevenueByTimeAndCategoryResponseType | null>
    >(`api/v1/manager/dashboard/revenue-by-time-and-category`, req);
    return res.payload.data;
  },
};

export default dashboardService;
