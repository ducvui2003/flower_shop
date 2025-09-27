import { UserModelType } from '@/models/user.model';
import PrismaService from '@/services/db.service';
import { injectable } from 'tsyringe';

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

@injectable()
class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}
  create(model: CreateUserInType): Promise<CreateUserOutType> {
    return this.prisma.user.create({
      data: {
        ...model,
      },
    });
  }
  findByEmailWithLogin(email: string): Promise<FindByEmailWithLoginOutType> {
    return this.prisma.user.findUniqueOrThrow({
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
  }
}

export { UserRepository, PrismaUserRepository };
