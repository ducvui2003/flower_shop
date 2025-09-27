import httpServer from '@/lib/http.server';
import { ResponseApi } from '@/types/api.type';
import { VnpayReturnSentBackendType } from '@/types/payment.type';

const paymentService = {
  vnpaySentToBackend: async (body: VnpayReturnSentBackendType) => {
    const data = await httpServer.post<ResponseApi<void>>(
      '/api/v1/payment/vn-pay-return',
      body,
    );
    return data.payload;
  },
};

export default paymentService;
