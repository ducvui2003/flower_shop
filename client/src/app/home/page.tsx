import Banner from '@/app/home/Banner';
import Hotline from '@/app/home/event/Hotline';
import SectionGeneric from '@/app/home/event/SectionGeneric';
import FeatureSection from '@/app/home/FeatureSection';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import HeaderWrapper from '@/components/common/HeaderWrapper';
import { Separator } from '@/components/ui/separator';

const HomePage = () => {
  const data = [
    {
      title: 'Hoa tươi giảm giá 30%',
      products: Array(4)
        .fill(null)
        .map((_) => ({
          id: 1,
          basePrice: 10000,
          salePrice: 8000,
          name: 'hello123',
          slug: '/123',
        })),
    },
    {
      title: 'HOA TẶNG TỐT NGHIỆP',
      products: Array(4)
        .fill(null)
        .map((_) => ({
          id: 1,
          basePrice: 10000,
          salePrice: 8000,
          name: 'hello123',
          slug: '/123',
        })),
    },
  ];
  return (
    <>
      <Header />
      <Hotline />
      <Banner />
      {data.map((item) => (
        <div className="container-p container">
          <SectionGeneric {...item} />
        </div>
      ))}
      <span className="my-8 block"></span>
      <FeatureSection />
      <Footer />
    </>
  );
};

export default HomePage;
