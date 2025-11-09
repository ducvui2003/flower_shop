import { MediaType } from '@/types/media.type';

type CategoryType = {
  id: number;
  name: string;
  thumbnail?: string;
};

type CategoryMediaPicked = { id: string; media: MediaType }[];

export type { CategoryType, CategoryMediaPicked };
