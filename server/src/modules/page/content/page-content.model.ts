import { PageContentMetadataModel, PageModel } from '@/modules/page/page.model';
import z from 'zod';

const PageWithContent = PageModel.extend({
  content: z.string(),
  metadata: PageContentMetadataModel.nullable(),
});

type PageWithContentType = z.infer<typeof PageWithContent>;

export { PageWithContent };
export type { PageWithContentType };
