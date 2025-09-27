import http from '@/lib/http.client';
import { ResponseApi } from '@/types/api.type';
import { SupplierType } from '@/types/supplier.type';

const supplierService = {
  findAll: async (): Promise<SupplierType[]> => {
    const res = await http.get<ResponseApi<SupplierType[]>>(
      `/api/v1/supplier`,
      undefined,
      false,
    );

    return res.payload.data;
  },
};

export default supplierService;
