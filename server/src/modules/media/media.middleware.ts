import multer from 'multer';

const uploadMiddleware = multer({
  storage: multer.memoryStorage(), // needed for R2 upload
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB max
});

export default uploadMiddleware;
