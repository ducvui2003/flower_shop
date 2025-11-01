import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { FormContactType } from '@/types/form-contact.type';
import { contactService } from '@/service/contact.service';

export const contactApi = createApi({
  reducerPath: 'contact-us',
  tagTypes: ['Contact'],
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    createContact: builder.mutation<unknown, FormContactType>({
      async queryFn(body) {
        try {
          const response = await contactService.createContact(body);
          return { data: response.payload };
        } catch (error: any) {
          return {
            error: {
              status: error?.status || 500,
              data: error?.payload || error?.message || 'Unknown error',
            },
          };
        }
      },
      invalidatesTags: ['Contact'],
    }),
  }),
});

export const { useCreateContactMutation } = contactApi;
