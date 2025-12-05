import z from 'zod';

enum PageType {
  HOME,
  CATEGORY,
  ABOUT,
}

const HomePageContent = z.object({
  banners: z.array(z.int()),
  navigator: z.array(
    z.object({
      title: z.string(),
      link: z.string(),
      child: z
        .array(
          z.object({
            title: z.string(),
            link: z.string(),
          }),
        )
        .optional(),
    }),
  ),
  categories: z.object({
    ids: z.array(z.int()),
    showItems: z.int(),
  }),
  sliders: z.object({
    title: z.string(),
    categoryIds: z.array(z.number()),
  }),
});
type HomePageContentType = z.infer<typeof HomePageContent>;

const SlugRegistry = z.object({
  id: z.int(),
  slug: z.string(),
});

type SlugRegistryType = z.infer<typeof SlugRegistry>;

const PageModel = z.object({
  id: z.int(),
  title: z.string(),
  slug: SlugRegistry,
  type: z.enum(Object.keys(PageType)),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
});

type PageContent = HomePageContentType;

const HomePageModel = PageModel.extend({
  content: HomePageContent,
});

type HomePageModelType = z.infer<typeof HomePageModel>;

const MediaModel = z.object({
  id: z.int(),
  key: z.string(),
  alt: z.string().nullable(),
  metadata: z.unknown().nullable(),
});

type MediaModelType = z.infer<typeof MediaModel>;

const CategoryModel = z.object({
  id: z.int(),
  name: z.string(),
  parentId: z.int().nullable(),
  slugRegistry: SlugRegistry,
  thumbnail: MediaModel.nullable(),
});

type CategoryModelType = z.infer<typeof CategoryModel>;

export { PageModel, HomePageContent };

export type {
  PageContent,
  HomePageModelType,
  HomePageContentType,
  MediaModelType,
  CategoryModelType,
};
