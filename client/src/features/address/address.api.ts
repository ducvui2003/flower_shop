import addressService from '@/service/address.service';
import { DistrictType, ProvinceType, WardType } from '@/types/address.type';
import { createApi } from '@reduxjs/toolkit/query/react';

export const addressApi = createApi({
  reducerPath: 'addressApi', // name field of redux state
  baseQuery: () => ({ data: {} }),
  endpoints: (builder) => ({
    getProvinces: builder.query<ProvinceType[], void>({
      async queryFn() {
        try {
          const data = await addressService.getProvince();
          return { data };
        } catch (error: any) {
          return {
            error: {
              status: error?.status || 500,
              data: error?.message || 'Unknown error',
            },
          };
        }
      },
    }),

    getDistricts: builder.query<DistrictType[], number>({
      async queryFn(provinceId) {
        try {
          const data = await addressService.getDistrict(provinceId);
          return { data };
        } catch (error: any) {
          return {
            error: {
              status: error?.status || 500,
              data: error?.message || 'Unknown error',
            },
          };
        }
      },
    }),

    getWards: builder.query<WardType[], number>({
      async queryFn(districtId) {
        try {
          const data = await addressService.getWard(districtId);
          return { data };
        } catch (error: any) {
          return {
            error: {
              status: error?.status || 500,
              data: error?.message || 'Unknown error',
            },
          };
        }
      },
    }),
  }),
});

export const { useGetProvincesQuery, useGetDistrictsQuery, useGetWardsQuery } =
  addressApi;
