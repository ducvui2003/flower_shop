import { PageContent } from '@/modules/page/page.model';
import z from 'zod';

type CategoryPageRequest = {
  name?: string;
};
type HomePageRequest = {
  content: PageContent;
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

type HomePageContentUpdateRequestType = z.infer<
  typeof HomePageContentUpdateRequestSchema
>;
export { HomePageContentUpdateRequestSchema };
export type {
  CategoryPageRequest,
  HomePageRequest,
  HomePageContentUpdateRequestType,
};
