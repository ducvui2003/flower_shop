import { MediaModelType } from '@/modules/media/media.model';
import prismaService from '@/shared/services/db.service';

interface MediaRepository {
  createMedia: (
    key: string,
    metadata?: Record<string, string>,
  ) => Promise<MediaModelType>;
}

const mediaRepository: MediaRepository = {
  createMedia: async (key: string, metadata?: Record<string, string>) => {
    return await prismaService.media.create({
      data: {
        key: key,
        metadata: metadata,
      },
    });
  },
};

export default mediaRepository;
