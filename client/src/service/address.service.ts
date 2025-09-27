import http from '@/lib/http.client';
import { DistrictType, ProvinceType, WardType } from '@/types/address.type';
import { ResponseApi } from '@/types/api.type';

const addressService = {
  getProvince: async (): Promise<ProvinceType[]> => {
    const res = await http.get<ResponseApi<ProvinceType[]>>(
      '/api/v1/address/province',
    );
    const body = res.payload.data;

    return body;
  },

  getDistrict: async (provinceId: number): Promise<DistrictType[]> => {
    const res = await http.get<ResponseApi<DistrictType[]>>(
      `/api/v1/address/district/${provinceId}`,
    );
    const body = res.payload.data;

    return body;
  },

  getWard: async (districtId: number): Promise<WardType[]> => {
    const res = await http.get<ResponseApi<WardType[]>>(
      `/api/v1/address/ward/${districtId}`,
    );
    const body = res.payload.data;

    return body;
  },
};

export default addressService;
