import z from 'zod';

const SlugRegistry = z.object({
  id: z.int(),
  slug: z.string(),
});

type SlugRegistryType = z.infer<typeof SlugRegistry>;
export { SlugRegistryType, SlugRegistry };
