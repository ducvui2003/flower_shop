import { PageContent as PageContentApp } from '@/modules/page/page.model';
import { ProductMetadataModelType } from '@/modules/product/product.model';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace PrismaJson {
    type PageContent = PageContentApp;
    type MediaMetadata = Record<string, string>;
    type ProductMetadata = ProductMetadataModelType;
  }
}

// The file MUST be a module!
export {};
