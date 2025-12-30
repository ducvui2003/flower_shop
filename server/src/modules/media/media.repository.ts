import prismaService from '@/shared/services/db.service';
import {
  MediaGetQueryType,
  MediaSearchGetQueryType,
} from '@/modules/media/media.request';
import { MediaModelType } from '@/shared/models/media.model';
import { Page } from '@/types/app';

interface MediaRepository {
  createMedia: (
    key: string,
    provider?: string,
    metadata?: Record<string, string>,
  ) => Promise<MediaModelType>;
  getMedias: (data: MediaSearchGetQueryType) => Promise<Page<MediaModelType>>;
  getMediasByIds: (data: MediaGetQueryType) => Promise<Array<MediaModelType>>;
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
    let whereClaude = {};
    if (data.excludes) {
      whereClaude = {
        id: { notIn: data.excludes },
      };
    }
    const [items, totalItems] = await prismaService.$transaction([
      prismaService.media.findMany({
        take: data.limit,
        skip: (data.page - 1) * data.limit,
        where: whereClaude,
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
      currentPage: items.length !== 0 ? data.page : 0,
      isLast: data.page === Math.ceil(totalItems / data.limit),
    };
  },
  getMediasByIds: async (data: MediaGetQueryType) => {
    const items = prismaService.media.findMany({
      where: {
        id: {
          in: data.ids,
        },
      },
      select: {
        id: true,
        key: true,
        alt: true,
        metadata: true,
        provider: true,
      },
    });
    return items;
  },
};

export default mediaRepository;
