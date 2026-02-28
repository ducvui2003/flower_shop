import CartDropdown from '@/components/CartDropdown';
import Logo from '@/components/Logo';
import Navigation from '@/components/Navigation';
import { ComponentProps } from 'react';
type Props = {
  navData: ComponentProps<typeof Navigation>['data'];
};

const HeaderMobile = ({ navData }: Props) => {
  return (
    <header id="header" className="container">
      <div className="my-3 flex h-[80px] items-center justify-between gap-5">
        <Navigation breakpoint="mobile" data={navData} />
        <Logo />
        <span>
          <CartDropdown />
        </span>
      </div>
    </header>
  );
};

export default HeaderMobile;
