import { PageContent as PageContentApp } from '@/modules/page/page.model';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace PrismaJson {
    type PageContent = PageContentApp;
    type MediaMetadata = Record<string, string>;
    type ProductSlugPlaceholder = {
      name: string;
    };
  }
}

// The file MUST be a module!
export {};
