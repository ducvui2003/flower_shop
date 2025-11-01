import { FormContactType } from '@/types/form-contact.type';
import http from '@/lib/http.client';

export const contactService = {
  createContact: async (body: FormContactType) =>
    await http.post('/api/v1/contact', body),
};
