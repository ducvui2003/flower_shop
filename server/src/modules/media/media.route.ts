import mediaController from '@/modules/media/media.controller';
import uploadMiddleware from '@/modules/media/media.middleware';
import {
  MediaCreateWithFile,
  MediaGetQuerySchema,
  MediaMetadataUpdateRequest,
  MediaSearchGetQuerySchema,
  MediaSignUrlRequest,
} from '@/modules/media/media.request';
import validationBodyMiddleware, {
  validateQueryMiddleware,
} from '@/shared/middlewares/validate.middleware';
import { Router } from 'express';

const mediaRouters = Router();
const mediaAdminRouters = Router();

mediaRouters
  .get(
    '/media',
    validateQueryMiddleware(MediaSearchGetQuerySchema),
    mediaController.getMedias,
  )
  .get(
    '/media-id',
    validateQueryMiddleware(MediaGetQuerySchema),
    mediaController.getMediasByIds,
  );

mediaAdminRouters
  .post(
    '/media/upload',
    validationBodyMiddleware(MediaCreateWithFile),
    uploadMiddleware.single('image'),
    mediaController.createMediaWithFile,
  )
  .post(
    '/media',
    validationBodyMiddleware(MediaSignUrlRequest),
    mediaController.createMedia,
  )
  .post(
    '/media/sign-url',
    validationBodyMiddleware(MediaSignUrlRequest),
    mediaController.getSignUrl,
  )
  .put(
    '/media/:id',
    validationBodyMiddleware(MediaMetadataUpdateRequest),
    mediaController.updateMediaMetadata,
  )
  .delete('/media/:id', mediaController.deleteMediaById);

export { mediaAdminRouters };
export default mediaRouters;
