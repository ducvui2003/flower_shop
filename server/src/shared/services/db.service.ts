import { getUser } from '@/shared/contexts/request.context';
import { PrismaClient } from '@prisma/client';

class PrismaService extends PrismaClient {
  constructor() {
    super({
      log: ['query'],
    });
    // this.$extends({
    //   query: {
    //     $allModels: {
    //       create: ({ args, query }) => {
    //         const email = getUser()?.email ?? 'anonymous';

    //         if ('createdAt' in (args.data ?? {})) {
    //           args.data.createdAt = new Date();
    //         }
    //         if ('createdBy' in (args.data ?? {})) {
    //           args.data.createdBy = email;
    //         }

    //         return query(args);
    //       },
    //       async update({ args, query }) {
    //         const email = getUser()?.email ?? 'anonymous';

    //         if ('updatedAt' in (args.data ?? {})) {
    //           args.data.updatedAt = new Date();
    //         }
    //         if ('updatedBy' in (args.data ?? {})) {
    //           args.data.updatedBy = email;
    //         }

    //         return query(args);
    //       },
    //     },
    //   },
    // });
  }
}

const prismaService = new PrismaService();

export default prismaService;
