import { MediaModelType } from '@/shared/models/media.model';
import mediaRepository from '@/modules/media/media.repository';
import envConfig from '@/shared/config/env.config';
import { AppResponse, Page } from '@/types/app';
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { StatusCodes } from 'http-status-codes';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { createUrl } from '@/shared/utils/media.util';
import {
  MediaGetQueryType,
  MediaMetadataUpdateRequestType,
  MediaSearchGetQueryType,
} from '@/modules/media/media.request';
import {
  addDatetimePostfix,
  mapperItems,
  mapperItemsForPage,
} from '@/shared/utils/common.util';
import { MediaResponseType } from '@/modules/media/media.response';
import {
  isForeignKeyNotFound,
  isRecordNotExist,
} from '@/shared/utils/error.util';

type FileMulter = Express.Multer.File;

const S3 = new S3Client({
  region: 'auto', // required for R2
  endpoint: envConfig.R2_ENDPOINT,
  credentials: {
    accessKeyId: envConfig.R2_ACCESS_KEY,
    secretAccessKey: envConfig.R2_SECRET_KEY,
  },
});

export async function deleteImageFromS3(key: string) {
  await S3.send(
    new DeleteObjectCommand({
      Bucket: envConfig.R2_BUCKET,
      Key: key,
    }),
  );
}

interface MediaService {
  createMedia: (
    key: string,
    file?: FileMulter,
    metadata?: Record<string, string>,
  ) => Promise<
    AppResponse<
      MediaModelType & {
        url: string;
      }
    >
  >;
  createSignUrl: (
    key: string,
    type: 'create' | 'update',
  ) => Promise<
    AppResponse<{
      url: string;
      key: string;
      expiresIn: number;
    }>
  >;
  getMedias: (
    data: MediaSearchGetQueryType,
  ) => Promise<AppResponse<Page<MediaModelType>>>;
  getMediasByIds: (
    data: MediaGetQueryType,
  ) => Promise<AppResponse<Array<MediaModelType>>>;
  updateMetadataById: (
    id: number,
    data: MediaMetadataUpdateRequestType,
  ) => Promise<AppResponse<void>>;
  deleteMediaById: (data: number) => Promise<AppResponse<void>>;
}

const mediaService: MediaService = {
  createMedia: async (
    key: string,
    file?: FileMulter,
    metadata?: Record<string, string>,
  ) => {
    try {
      if (file) {
        await uploadToS3(file, key, metadata);
      }
      const data = await mediaRepository.createMedia(key, 'r2', metadata);
      return {
        code: StatusCodes.CREATED,
        data: {
          ...data,
          url: createUrl(key),
        },
      };
    } catch (e) {
      return {
        code: StatusCodes.EXPECTATION_FAILED,
      };
    }
  },

  createSignUrl: async (key: string, type: 'create' | 'update') => {
    if (type === 'create') {
      const url = await getSignedUrl(
        S3,
        new PutObjectCommand({ Bucket: envConfig.R2_BUCKET, Key: key }),
        { expiresIn: 3600 },
      );
      return {
        code: StatusCodes.OK,
        data: {
          url,
          key: key,
          expiresIn: 3600,
        },
      };
    } else {
      const isExist = await mediaRepository.isKeyExist(key);
      const newKey = !isExist ? key : addDatetimePostfix(key);
      const url = await getSignedUrl(
        S3,
        new PutObjectCommand({ Bucket: envConfig.R2_BUCKET, Key: newKey }),
        { expiresIn: 3600 },
      );
      return {
        code: StatusCodes.OK,
        data: {
          url,
          key: newKey,
          expiresIn: 3600,
        },
      };
    }
  },

  getMedias: async (
    data: MediaSearchGetQueryType,
  ): Promise<AppResponse<Page<MediaResponseType>>> => {
    const page = await mediaRepository.getMedias(data);
    const newPage = mapperItemsForPage<MediaModelType, MediaResponseType>(
      page,
      (item) => ({
        ...item,
        href: createUrl(item.key),
      }),
    );
    return {
      code: StatusCodes.OK,
      message: 'Search products',
      data: newPage,
    };
  },
  getMediasByIds: async (
    data: MediaGetQueryType,
  ): Promise<AppResponse<Array<MediaResponseType>>> => {
    const page = await mediaRepository.getMediasByIds(data);
    const newPage = mapperItems<MediaModelType, MediaResponseType>(
      page,
      (item) => ({
        ...item,
        href: createUrl(item.key),
      }),
    );
    return {
      code: StatusCodes.OK,
      message: 'Get media by ids',
      data: newPage,
    };
  },
  updateMetadataById: async (
    id: number,
    data: MediaMetadataUpdateRequestType,
  ): Promise<AppResponse<void>> => {
    try {
      const metadata = data.metadata;
      await mediaRepository.updateMetadataById(id, metadata);
      return {
        code: StatusCodes.OK,
        message: 'Update Media metadata success',
      };
    } catch (err) {
      if (isRecordNotExist(err))
        return {
          code: StatusCodes.NOT_FOUND,
          message: 'Media not found',
        };
      return {
        code: StatusCodes.INTERNAL_SERVER_ERROR,
      };
    }
  },
  deleteMediaById: async (data: number): Promise<AppResponse<void>> => {
    try {
      const media = await mediaRepository.deleteMediaById(data);
      await deleteImageFromS3(media.key);
      return {
        code: StatusCodes.NO_CONTENT,
        message: `Delete media #${data} success`,
      };
    } catch (err) {
      if (isForeignKeyNotFound(err))
        return {
          code: StatusCodes.CONFLICT,
          message: 'Media is still in use',
        };
      if (isRecordNotExist(err)) {
        return {
          code: StatusCodes.NOT_FOUND,
          message: 'Media not found',
        };
      }
      return {
        code: StatusCodes.INTERNAL_SERVER_ERROR,
      };
    }
  },
};
const uploadToS3 = async (
  file: FileMulter,
  key: string,
  metadata?: Record<string, string>,
) => {
  await S3.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET!,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      CacheControl: 'public, max-age=31536000, immutable',
      Metadata: metadata,
    }),
  );

  return {
    key,
    url: `${envConfig.R2_PUBLIC_DOMAIN}/${key}`,
  };
};
export default mediaService;
