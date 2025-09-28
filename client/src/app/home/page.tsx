import Banner from '@/app/home/Banner';
import Hotline from '@/app/home/event/Hotline';
import SectionGeneric from '@/app/home/event/SectionGeneric';
import FeatureSection from '@/app/home/FeatureSection';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import pageService from '@/service/page.service';

const HomePage = async () => {
  const data = await pageService.getSectionHome();
  return (
    <>
      <Header />
      <Hotline />
      <Banner />
      {data.map((item, i) => (
        <div className="container-p container">
          <SectionGeneric
            key={i}
            title={item.title}
            products={item.products}
            href={item.listHref}
          />
        </div>
      ))}
      <span className="my-8 block"></span>
      <FeatureSection />
      <Footer />
    </>
  );
};

export default HomePage;
