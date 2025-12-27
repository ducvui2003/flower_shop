import { MediaModelType } from '@/shared/models/media.model';
import mediaRepository from '@/modules/media/media.repository';
import envConfig from '@/shared/config/env.config';
import { AppResponse, Page } from '@/types/app';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { StatusCodes } from 'http-status-codes';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { createUrl } from '@/shared/utils/media.util';
import {
  MediaGetQueryType,
  MediaSearchGetQueryType,
} from '@/modules/media/media.request';
import { mapperItems, mapperItemsForPage } from '@/shared/utils/common.util';
import { MediaResponseType } from '@/modules/media/media.response';

type FileMulter = Express.Multer.File;

const S3 = new S3Client({
  region: 'auto', // required for R2
  endpoint: envConfig.R2_ENDPOINT,
  credentials: {
    accessKeyId: envConfig.R2_ACCESS_KEY,
    secretAccessKey: envConfig.R2_SECRET_KEY,
  },
});

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
  createSignUrl: (key: string) => Promise<{
    url: string;
    expiresIn: number;
  }>;
  getMedias: (
    data: MediaSearchGetQueryType,
  ) => Promise<AppResponse<Page<MediaModelType>>>;
  getMediasByIds: (
    data: MediaGetQueryType,
  ) => Promise<AppResponse<Array<MediaModelType>>>;
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

  createSignUrl: async (key: string) => {
    const url = await getSignedUrl(
      S3,
      new PutObjectCommand({ Bucket: envConfig.R2_BUCKET, Key: key }),
      { expiresIn: 3600 },
    );
    return {
      url,
      expiresIn: 3600,
    };
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
