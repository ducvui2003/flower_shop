import z from 'zod';

const MediaCreateWithFile = z.object({
  key: z.string(),
  metadata: z.record(z.string(), z.string()).optional(),
});
type MediaCreateWithFileType = z.infer<typeof MediaCreateWithFile>;

const MediaSignUrlRequest = z.object({
  key: z.string(),
  metadata: z.record(z.string(), z.string()).optional(),
});

type MediaSignUrlRequestType = z.infer<typeof MediaSignUrlRequest>;

export { MediaSignUrlRequest, MediaCreateWithFile };

export type { MediaSignUrlRequestType, MediaCreateWithFileType };
