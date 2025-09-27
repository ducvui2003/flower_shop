import httpServer from '@/lib/http.server';
import { ResponseApi } from '@/types/api.type';
import { DashboardResType } from '@/types/dashboard.type';

const dashboardService = {
  getDashboard: async () => {
    const res = await httpServer.get<ResponseApi<DashboardResType>>(
      `api/v1/manager/dashboard/stats`,
      undefined,
    );
    return res.payload.data;
  },
};

export default dashboardService;
