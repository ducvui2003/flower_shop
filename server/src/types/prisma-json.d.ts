import {
  PageContent as PageContentApp,
  PageContentMetadataType,
} from '@/modules/page/page.model';
import { ProductMetadataModelType } from '@/modules/product/product.model';

declare global {
  namespace PrismaJson {
    type PageContent = PageContentApp;
    type MediaMetadata = Record<string, string>;
    type ProductMetadata = ProductMetadataModelType;
    type PageContentMetadata = PageContentMetadataType;
  }
}

// The file MUST be a module!
export {};
