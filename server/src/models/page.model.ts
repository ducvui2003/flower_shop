import { MetadataModel } from '@/models/common.model';
import z from 'zod';

enum PageType {
  HOME,
  CATEGORY,
  ABOUT,
}

const PageModel = MetadataModel.extend({
  id: z.int(),
  title: z.string(),
  slug: z.string(),
  type: z.enum(PageType),
  content: z.json(),
});

export { PageModel };
