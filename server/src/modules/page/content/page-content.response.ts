import { PageContentMetadataType } from '@/modules/page/page.model';
import { PageResponse } from '@/modules/page/page.response';

type PageContentResponse = PageResponse<string> & {
  metadata: PageContentMetadataType | null;
};
export type { PageContentResponse };
