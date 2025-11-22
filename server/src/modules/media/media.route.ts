import mediaController from '@/modules/media/media.controller';
import uploadMiddleware from '@/modules/media/media.middleware';
import {
  MediaCreateWithFile,
  MediaSignUrlRequest,
} from '@/modules/media/media.request';
import validationBodyMiddleware from '@/shared/middlewares/validate.middleware';
import { Router } from 'express';

const mediaRouters = Router();

mediaRouters
  .post(
    '/media/upload',
    validationBodyMiddleware(MediaCreateWithFile),
    uploadMiddleware.single('image'),
    mediaController.createMediaWithFile,
  )
  .post(
    '/media',
    validationBodyMiddleware(MediaSignUrlRequest),
    mediaController.createMediaWithFile,
  )
  .get(
    '/media/sign-url',
    validationBodyMiddleware(MediaSignUrlRequest),
    mediaController.getSignUrl,
  );
export default mediaRouters;
