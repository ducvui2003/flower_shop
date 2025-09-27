import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import React, { ReactNode } from 'react';

type HeaderWrapperProp = {
  children?: ReactNode;
  footer?: boolean;
  container?: boolean;
};
const HeaderWrapper = ({
  children,
  footer: enableFooter = false,
  container = false,
}: HeaderWrapperProp) => {
  return (
    <>
      <Header />
      {container ? <div className="container">{children}</div> : children}
      {enableFooter && <Footer />}
    </>
  );
};

export default HeaderWrapper;
