import Banner from '@/app/home/Banner';
import CategorySection from '@/components/event/CategorySection';
import SectionGeneric from '@/components/event/SectionGeneric';
import FeatureSection from '@/app/home/FeatureSection';
import pageService from '@/service/page.service';
import { CategoryProduct, CategorySlider } from '@/types/page.type';
import React from 'react';
import { notFound } from 'next/navigation';
import { DEFAULT_IMAGE } from '@/utils/const.util';

const getData = async () => {
  try {
    const data = await pageService.getHomeStructure();
    const {
      content: { banners, sections },
    } = data;
    const categorySliderData = sections.filter(
      (item) => item.type === 'slider',
    )[0];
    const categoryProductData = sections.filter(
      (item) => item.type === 'category-product',
    );
    const categories = (categorySliderData.content as CategorySlider).items.map(
      (item) => ({
        id: item.id,
        name: item.name,
        thumbnail: item.thumbnail.href,
        href: item.link,
      }),
    );
    return {
      banners,
      categorySliderData,
      categoryProductData,
      categories,
    };
  } catch (e) {
    console.log(e);
    return null;
  }
};

export default async function HomePage() {
  const response = await getData();
  if (response == null) notFound();
  const { banners, categories, categoryProductData, categorySliderData } =
    response;

  return (
    <>
      <Banner data={banners} />
      <Spacing />
      <div className="container-p container my-4">
        <CategorySection
          title={categorySliderData.title}
          categories={categories}
        />
      </div>
      <Spacing />
      {categoryProductData.map((item, i) => (
        <React.Fragment key={i}>
          <div className="container-p container">
            <SectionGeneric
              title={item.title}
              products={(item.content as CategoryProduct).items.map((item) => ({
                id: item.id,
                name: item.title,
                basePrice: item.price,
                salePrice: item.salePrice,
                link: item.link,
                thumbnails: item?.thumbnail?.href ?? DEFAULT_IMAGE,
              }))}
              link={(item.content as CategoryProduct).link}
            />
          </div>
          {i < categoryProductData.length - 1 && <Spacing />}
        </React.Fragment>
      ))}
      <Spacing />
      <FeatureSection />
    </>
  );
}

const Spacing = () => {
  return <span className="pc:py-6 block py-4"></span>;
};
