import z from 'zod';

const MediaModel = z.object({
  id: z.int(),
  key: z.string(),
  alt: z.string().nullable(),
  metadata: z.record(z.string(), z.string()).nullable(),
  provider: z.string().nullable(),
});

type MediaModelType = z.infer<typeof MediaModel>;

export type { MediaModelType };

export { MediaModel };
