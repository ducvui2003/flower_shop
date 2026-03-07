import z from 'zod';

const PageSectionTypeSchema = z.enum([
  'banner',
  'category_slider',
  'category_product_section',
]);

const PageSectionCreateSchema = z.object({
  id: z.number().optional(),
  type: PageSectionTypeSchema,
  config: z.json(),
  position: z.number(),
  pageId: z.number().optional(),
  isActive: z.boolean().optional(),
});

const PageSectionUpdateSchema = PageSectionCreateSchema.extend({
  id: z.number(),
});

type CategoryPageRequest = {
  name?: string;
};

const NavigateItemSchema = z.object({
  title: z.string(),
  link: z.string(),
});

const HomePageContentUpdateRequestSchema = z.object({
  banners: z.array(z.number()),
  categories: z.object({
    ids: z.array(z.number()),
    showItems: z.number(),
  }),
  navigator: z.array(
    NavigateItemSchema.extend({
      title: z.string(),
      link: z.string(),
      child: z.array(NavigateItemSchema).optional(),
    }),
  ),
});

const PageSectionUpdateRequestSchema = z.object({
  new: z.array(PageSectionCreateSchema),
  update: z.array(PageSectionUpdateSchema),
  delete: z.array(z.int()),
});
type PageSectionUpdateRequestType = z.infer<
  typeof PageSectionUpdateRequestSchema
>;
export { HomePageContentUpdateRequestSchema, PageSectionUpdateRequestSchema };
export type { CategoryPageRequest, PageSectionUpdateRequestType };
