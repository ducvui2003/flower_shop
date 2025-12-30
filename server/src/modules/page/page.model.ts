import { SlugRegistry } from '@/shared/models/slug.model';
import z from 'zod';

enum PageType {
  HOME,
  CATEGORY,
  ABOUT,
}

enum NavigatorType {
  page,
  category,
}

const NavigatorModel = z.object({
  id: z.number(),
  parent: z.number().nullable(),
  label: z.string(),
  ref: z.number(),
  tableRef: z.enum(Object.keys(NavigatorType)),
});

type NavigatorModelType = z.infer<typeof NavigatorModel>;

type NavigatorAggregateType = {
  title: string;
  href: string;
  child: Array<{
    title: string;
    href: string;
  }>;
};

type BannerPageSectionType = {
  mediaIds: Array<number>;
};

type CategorySliderPageSectionType = {
  title: string;
  categoryIds: Array<number>;
};

type CategoryProductPageSectionType = {
  categories: Array<{
    id: number;
    title: string;
    productIds: Array<number>;
  }>;
};

const HomePageContent = z.object({
  banners: z.object({
    mediaIds: z.array(z.int()),
  }),
  sliders: z.object({
    title: z.string(),
    categoryIds: z.array(z.number()),
  }),
  categories: z.array(
    z.object({
      id: z.int(),
      title: z.string(),
      productIds: z.array(z.int()),
    }),
  ),
});
type HomePageContentType = z.infer<typeof HomePageContent>;

const PageModel = z.object({
  id: z.int(),
  title: z.string(),
  slug: SlugRegistry,
  type: z.enum(Object.keys(PageType)),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
});

type PageModelType = z.infer<typeof PageModel>;

type PageContent = HomePageContentType;

const HomePageModel = PageModel.omit({
  createdAt: true,
  updatedAt: true,
}).extend({
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
  slugRegistry: SlugRegistry,
  slugPlaceholder: z.string(),
  thumbnail: MediaModel.nullable(),
});

type CategoryModelType = z.infer<typeof CategoryModel>;

export { PageModel, HomePageContent, NavigatorModel };

export type {
  PageContent,
  HomePageModelType,
  PageModelType,
  HomePageContentType,
  MediaModelType,
  CategoryModelType,
  NavigatorModelType,
  NavigatorAggregateType,
  BannerPageSectionType,
  CategorySliderPageSectionType,
  CategoryProductPageSectionType,
};
