import userManagerService from '@/service/manager/user-manager.service';
import { Paging } from '@/types/api.type';
import {
  GetUserDetailResType,
  GetUserQueryReqType,
  GetUserResType,
  UserStatus,
} from '@/types/user.type';
import { createApi } from '@reduxjs/toolkit/query/react';
export const userApi = createApi({
  reducerPath: 'userApi', // name field of redux state
  baseQuery: () => ({ data: {} }),
  tagTypes: ['UserManager'],

  endpoints: (builder) => ({
    getUserTable: builder.query<Paging<GetUserResType>, GetUserQueryReqType>({
      async queryFn(paging) {
        try {
          const data = await userManagerService.getTable(paging);
          return { data: data };
        } catch (error: any) {
          return {
            error: {
              status: error?.status || 500,
              data: error?.message || 'Unknown error',
            },
          };
        }
      },
      providesTags(result) {
        if (result) {
          const final = [
            ...result.items.map((item) => ({
              type: 'UserManager' as const,
              id: item.id,
            })),
            {
              type: 'UserManager' as const,
              id: 'LIST',
            },
          ];
          return final;
        }
        const final = [
          {
            type: 'UserManager' as const,
            id: 'LIST',
          },
        ];
        return final;
      },
    }),

    getUserDetail: builder.query<GetUserDetailResType, number>({
      async queryFn(arg) {
        try {
          const data = await userManagerService.getDetail(arg);
          return { data: data };
        } catch (error: any) {
          return {
            error: {
              status: error?.status || 500,
              data: error?.message || 'Unknown error',
            },
          };
        }
      },
      providesTags: (_, __, id) => [{ type: 'UserManager', id }],
    }),

    changeStatus: builder.mutation<
      number,
      {
        id: number;
        status: Exclude<UserStatus, 'INACTIVE'>;
      }
    >({
      async queryFn({ id, status }) {
        try {
          let response;
          if (status === 'ACTIVE')
            response = await userManagerService.unblock(id);
          else response = await userManagerService.block(id);
          console.log(response);
          return { data: response.statusCode };
        } catch (error: any) {
          return {
            error: {
              status: error?.status || 500,
              data: error?.message || 'Unknown error',
            },
          };
        }
      },
      invalidatesTags: (_, __, { id }) => {
        return [{ type: 'UserManager', id: id }];
      },
    }),
  }),
});
export const {
  useGetUserTableQuery,
  useGetUserDetailQuery,
  useChangeStatusMutation,
} = userApi;
