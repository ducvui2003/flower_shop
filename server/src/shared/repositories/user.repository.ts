import { UserModelType } from '@/shared/models/user.model';
import prismaService from '@/shared/services/db.service';

type CreateUserInType = Pick<UserModelType, 'email' | 'password' | 'name'>;
type CreateUserOutType = UserModelType;
type FindByEmailWithLoginOutType = Pick<
  UserModelType,
  'email' | 'password' | 'name' | 'id'
>;
interface UserRepository {
  create(model: CreateUserInType): Promise<CreateUserOutType>;

  findByEmailWithLogin(email: string): Promise<FindByEmailWithLoginOutType>;
}

const prismaUserRepository: UserRepository = {
  create(model: CreateUserInType): Promise<CreateUserOutType> {
    return prismaService.user.create({
      data: {
        ...model,
      },
    });
  },
  findByEmailWithLogin(email: string): Promise<FindByEmailWithLoginOutType> {
    return prismaService.user.findUniqueOrThrow({
      where: {
        email: email,
      },
      select: {
        id: true,
        name: true,
        password: true,
        email: true,
      },
    });
  },
};
const userRepository = prismaUserRepository;
export default userRepository;
export { UserRepository };
