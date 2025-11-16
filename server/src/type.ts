import { PageContent as PageContentApp } from '@/types/page';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace PrismaJson {
    type PageContent = PageContentApp;
  }
}

// The file MUST be a module!
export {};
