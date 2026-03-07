import { MediaModelType } from '@/shared/models/media.model';

type MediaResponseType = MediaModelType & {
  href: string;
};
export type { MediaResponseType };
