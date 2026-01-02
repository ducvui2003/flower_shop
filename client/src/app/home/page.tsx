import Banner from '@/app/home/Banner';
import FeatureSection from '@/app/home/FeatureSection';
import CategorySection from '@/components/event/CategorySection';
import SectionGeneric from '@/components/event/SectionGeneric';
import { uuid } from '@/lib/utils';
import pageService from '@/service/page.service';
import {
  HomePageResponse,
  SectionBanner,
  SectionCategoryProduct,
  SectionCategorySlider,
} from '@/types/page.type';
import {
  APP_INFO,
  DEFAULT_IMAGE_CATEGORY,
  DEFAULT_IMAGE_PRODUCT,
} from '@/utils/const.util';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import React, { cache } from 'react';

const getData = cache(async () => {
  try {
    const data = await pageService.getHomeStructure();
    return {
      title: data.title,
      content: data.content,
    };
  } catch (e) {
    return null;
  }
});

export async function generateMetadata() {
  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = headersList.get('x-forwarded-proto') || 'https';
  const fullUrl = `${protocol}://${host}`;
  return {
    title: APP_INFO.NAME,
    url: fullUrl,
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
              <React.Fragment key={uuid()}>
                <Banner data={data.content} />
                <Spacing />
              </React.Fragment>
            );
          }
          case 'categorySlider': {
            const data = section as SectionCategorySlider;
            return (
              <React.Fragment key={uuid()}>
                <div className="container-p container my-4">
                  <CategorySection
                    title={data.title}
                    categories={data.content.map((i) => ({
                      id: i.id,
                      name: i.name,
                      link: i.href,
                      thumbnail: i?.thumbnail ?? DEFAULT_IMAGE_CATEGORY,
                    }))}
                  />
                </div>
                <Spacing />
              </React.Fragment>
            );
          }
          case 'categoryProduct': {
            const data = section as SectionCategoryProduct;
            return (
              <React.Fragment key={uuid()}>
                <div className="container-p container">
                  <SectionGeneric
                    title={data.title}
                    products={data.content.items.map((item) => ({
                      id: item.id,
                      name: item.title,
                      price: item.price,
                      priceSale: item.priceSale,
                      href: item.href,
                      thumbnails: item?.thumbnail ?? DEFAULT_IMAGE_PRODUCT,
                    }))}
                    link={data.content.href}
                  />
                </div>
                <Spacing />
              </React.Fragment>
            );
          }
        }
      })}

      <FeatureSection />
    </>
  );
}

const Spacing = () => {
  return <span className="pc:py-6 block py-4"></span>;
};
