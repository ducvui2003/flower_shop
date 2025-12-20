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

const MediaSearchGetQuerySchema = z.object({
  page: z.preprocess(
    (v) => (v === undefined ? undefined : Number(v)),
    z.number().int().min(1).default(1),
  ),
  limit: z.preprocess(
    (v) => (v === undefined ? undefined : Number(v)),
    z.number().int().min(1).max(50).default(5),
  ),
});

type MediaSignUrlRequestType = z.infer<typeof MediaSignUrlRequest>;
type MediaSearchGetQueryType = z.infer<typeof MediaSearchGetQuerySchema>;

export { MediaSignUrlRequest, MediaCreateWithFile, MediaSearchGetQuerySchema };

export type {
  MediaSignUrlRequestType,
  MediaCreateWithFileType,
  MediaSearchGetQueryType,
};
