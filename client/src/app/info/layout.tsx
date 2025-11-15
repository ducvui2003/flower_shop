import Hotline from '@/components/event/Hotline';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import React, { ReactNode } from 'react';
type InfoLayoutProps = {
  children: ReactNode;
};

const InfoLayout = () => {
  return (
    <React.Fragment>
      <Header />
      <Hotline />

      <Footer />
    </React.Fragment>
  );
};

export default InfoLayout;
