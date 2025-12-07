import { MediaModelType } from '@/shared/models/media.model';
import prismaService from '@/shared/services/db.service';

interface MediaRepository {
  createMedia: (
    key: string,
    provider?: string,
    metadata?: Record<string, string>,
  ) => Promise<MediaModelType>;
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
};

export default mediaRepository;
