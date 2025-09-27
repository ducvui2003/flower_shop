import { MetadataModel } from '@/models/common.model';
import z from 'zod';

const UserModel = MetadataModel.extend({
  id: z.int(),
  name: z.string().min(100),
  email: z.email(),
  password: z.string(),
});
type UserModelType = z.infer<typeof UserModel>;
export { UserModel, UserModelType };
