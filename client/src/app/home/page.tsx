import Banner from '@/app/home/Banner';
import CategorySection from '@/components/event/CategorySection';
import SectionGeneric from '@/components/event/SectionGeneric';
import FeatureSection from '@/app/home/FeatureSection';
import pageService from '@/service/page.service';
import React from 'react';
import { notFound } from 'next/navigation';
import {
  APP_INFO,
  DEFAULT_IMAGE_CATEGORY,
  DEFAULT_IMAGE_PRODUCT,
} from '@/utils/const.util';
import { Metadata } from 'next';
import {
  HomePageResponse,
  SectionBanner,
  SectionCategoryProduct,
  SectionCategorySlider,
} from '@/types/page.type';

const getData = async () => {
  try {
    const data = await pageService.getHomeStructure();
    return {
      title: data.title,
      content: data.content,
    };
  } catch (e) {
    return null;
  }
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: APP_INFO.NAME,
    openGraph: {
      images: ['/logo.jpg'],
    },
  };
}

export default async function HomePage() {
  const data: Omit<HomePageResponse, 'slug'> | null = await getData();
  if (data == null) notFound();
  return (
    <>
      {data.content.map((section) => {
        switch (section.type) {
          case 'banner': {
            const data = section as SectionBanner;
            return (
              <>
                <Banner data={data.content} />;
                <Spacing />
              </>
            );
          }
          case 'categorySlider': {
            const data = section as SectionCategorySlider;
            return (
              <>
                <div className="container-p container my-4">
                  <CategorySection
                    title={data.title}
                    categories={data.content.map((i) => ({
                      id: i.id,
                      name: i.name,
                      link: i.link,
                      thumbnail: i?.thumbnail ?? DEFAULT_IMAGE_CATEGORY,
                    }))}
                  />
                </div>
                <Spacing />
              </>
            );
          }
          case 'categoryProduct': {
            const data = section as SectionCategoryProduct;
            return (
              <div className="container-p container">
                <SectionGeneric
                  title={data.title}
                  products={data.content.items.map((item) => ({
                    id: item.id,
                    name: item.title,
                    basePrice: item.price,
                    salePrice: item.priceSale,
                    link: item.link,
                    thumbnails: item?.thumbnail ?? DEFAULT_IMAGE_PRODUCT,
                  }))}
                  link={data.content.link}
                />
              </div>
            );
          }
        }
      })}
      <Spacing />
      <FeatureSection />
    </>
  );
}

const Spacing = () => {
  return <span className="pc:py-6 block py-4"></span>;
};
