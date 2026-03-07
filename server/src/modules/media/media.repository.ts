import prismaService from '@/shared/services/db.service';
import {
  MediaGetQueryType,
  MediaMetadataUpdateRequestType,
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
  isKeyExist: (data: string) => Promise<boolean>;
  updateMetadataById: (
    id: number,
    metadata: Record<string, string>,
  ) => Promise<void>;
  deleteMediaById: (data: number) => Promise<MediaModelType>;
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
  isKeyExist: async (data: string): Promise<boolean> => {
    const media = await prismaService.media.findFirst({
      where: {
        key: data,
      },
    });
    return media ? true : false;
  },
  updateMetadataById: async (id: number, metadata: Record<string, string>) => {
    await prismaService.media.update({
      where: {
        id: id,
      },
      data: {
        metadata: metadata,
      },
    });
  },
  deleteMediaById: async (data: number): Promise<MediaModelType> => {
    const media = await prismaService.media.delete({
      where: {
        id: data,
      },
    });
    return {
      id: media.id,
      key: media.key,
      alt: media.alt,
      metadata: media.metadata,
      provider: media.provider,
    };
  },
};

export default mediaRepository;
