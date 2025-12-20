import {
  MediaCreateWithFileType,
  MediaSearchGetQueryType,
  MediaSignUrlRequestType,
} from '@/modules/media/media.request';
import mediaService from '@/modules/media/media.service';
import logger from '@/shared/utils/logger.util';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const mediaController = {
  createMediaWithFile: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      if (!req.file) {
        res.status(StatusCodes.BAD_REQUEST).send('No file uploaded');
        return;
      }
      const body: MediaCreateWithFileType = req.body;
      const data = await mediaService.createMedia(
        body.key,
        req.file,
        body.metadata,
      );
      logger.info(data);

      res.status(StatusCodes.OK).json({
        success: true,
        data: data,
      });
    } catch (err) {
      next(err);
    }
  },
  getSignUrl: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const body: MediaSignUrlRequestType = req.body;
      const data = await mediaService.createSignUrl(body.key);
      logger.info(data);

      res.status(StatusCodes.OK).json({
        success: true,
        data: data,
      });
    } catch (e) {
      next(e);
    }
  },
  createMedia: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const body: MediaSignUrlRequestType = req.body;
      const data = await mediaService.createMedia(
        body.key,
        undefined,
        body.metadata,
      );
      logger.info(data);

      res.status(StatusCodes.OK).json({
        success: true,
        data: data,
      });
    } catch (err) {
      next(err);
    }
  },
  getMedias: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const query: MediaSearchGetQueryType = req.locals.query;
      const data = await mediaService.getMedias(query);

      res.status(data.code).json(data);
    } catch (err) {
      next(err);
    }
  },
};
export default mediaController;
