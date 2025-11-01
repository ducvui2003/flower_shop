import { z } from 'zod';
import { SendContactSchema } from '@/types/schema/contact.schema';

type SendContactReqType = z.infer<typeof SendContactSchema>;

export type { SendContactReqType };
