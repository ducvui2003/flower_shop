import prismaService from '@/shared/services/db.service';
import { MediaSearchGetQueryType } from '@/modules/media/media.request';
import { MediaModelType } from '@/shared/models/media.model';
import { Page } from '@/types/app';

interface MediaRepository {
  createMedia: (
    key: string,
    provider?: string,
    metadata?: Record<string, string>,
  ) => Promise<MediaModelType>;
  getMedias: (data: MediaSearchGetQueryType) => Promise<Page<MediaModelType>>;
}

const mediaRepository: MediaRepository = {
  createMedia: async (
    key: string,
    provider: string = 'localhost',
    metadata?: Record<string, string>,
  ) => {
    return await prismaService.media.create({
      data: {
        key: key,
        metadata: metadata,
        provider: provider,
      },
    });
  },
  getMedias: async (data: MediaSearchGetQueryType) => {
    const [items, totalItems] = await prismaService.$transaction([
      prismaService.media.findMany({
        take: data.limit,
        skip: (data.page - 1) * data.limit,
        select: {
          id: true,
          key: true,
          alt: true,
          metadata: true,
          provider: true,
        },
      }),
      prismaService.media.count(),
    ]);

    return {
      items,
      totalItems,
      totalPages: Math.ceil(totalItems / data.limit),
      currentPage: data.page,
      isLast: data.page === Math.ceil(totalItems / data.limit),
    };
  },
};

export default mediaRepository;
