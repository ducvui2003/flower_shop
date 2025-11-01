import Banner from '@/app/home/Banner';
import SectionGeneric from '@/app/home/event/SectionGeneric';
import FeatureSection from '@/app/home/FeatureSection';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import HeaderSticky from '@/components/common/HeaderSticky';
import { Separator } from '@/components/ui/separator';
import pageService from '@/service/page.service';
import React from 'react';

const HomePage = async () => {
  const data = await pageService.getSectionHome();

  return (
    <React.Fragment>
      <Banner />
      <span className="my-8 block"></span>
      <FeatureSection />
      <span className="block pt-14"></span>
      {data.map((item, i) => (
        <div className="container-p container" key={i}>
          <SectionGeneric
            title={item.title}
            products={item.products}
            href={item.listHref}
          />
          {i != data.length - 1 && (
            <Separator className="bg-primary pc:my-8 my-4 !h-[2px]" />
          )}
        </div>
      ))}

      <Footer />
    </React.Fragment>
  );
};

export default HomePage;
