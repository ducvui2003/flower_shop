import z from 'zod';

const PageContentUpdateRequestSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  metadata: z
    .object({
      title: z.string(),
      metaDescription: z.string(),
    })
    .optional(),
});
type PageContentUpdateRequestType = z.infer<
  typeof PageContentUpdateRequestSchema
>;
export { PageContentUpdateRequestSchema };
export type { PageContentUpdateRequestType };
