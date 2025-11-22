import { Link } from '@/types/common';

type NavigateItem = {
  title: string;
  link: Link;
};

type HomePageContent = {
  banners: Array<number>;
  categories: {
    ids: Array<number>;
    showItems: number;
  };
  navigator: Array<{
    title: string;
    link: Link;
    child?: Array<NavigateItem>;
  }>;
};

type PageContent = HomePageContent;

export type { HomePageContent, PageContent };
