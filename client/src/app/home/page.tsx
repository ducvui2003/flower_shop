import Banner from '@/app/home/Banner';
import CategorySection from '@/app/home/event/CategorySection';
import SectionGeneric from '@/app/home/event/SectionGeneric';
import FeatureSection from '@/app/home/FeatureSection';
import pageService from '@/service/page.service';
import React from 'react';

const HomePage = async () => {
  const data = await pageService.getSectionHome();
  const dataCategory = await pageService.getSectionCategory();
  return (
    <React.Fragment>
      <Banner />
      <Spacing />
      <div className="container-p container my-4">
        <CategorySection
          title={dataCategory.title}
          categories={dataCategory.categories}
        />
      </div>
      <Spacing />
      {data.map((item, i) => (
        <React.Fragment key={i}>
          <div className="container-p container">
            <SectionGeneric
              title={item.title}
              products={item.products}
              href={item.listHref}
            />
          </div>
          {i < data.length - 1 && <Spacing />}
        </React.Fragment>
      ))}
      <Spacing />
      <FeatureSection />
    </React.Fragment>
  );
};

const Spacing = () => {
  return <span className="pc:py-6 block py-4"></span>;
};

export default HomePage;
