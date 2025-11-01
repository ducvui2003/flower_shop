import CartDropdown from '@/components/CartDropdown';
import Logo from '@/components/Logo';
import Navigation from '@/components/Navigation';
import SearchBar from '@/components/SearchBar';
import { Separator } from '@/components/ui/separator';
import { APP_INFO } from '@/utils/const.util';
import Image from 'next/image';
import hotline from '/public/images/hotline-header.jpg';

const Header = async () => {
  return (
    <header className="pt-3" style={{ '--header-height': '60px' } as any}>
      <div id="header" className="container">
        <div className="my-2 flex h-[80px] items-center justify-between gap-5">
          <Logo className="pc:order-0 order-1" />
          <SearchBar className="pc:flex pc:flex-1 hidden" />
          <Navigation breakpoint="mobile" />
          <Image
            className="pc:block hidden"
            width={280}
            height={100}
            src={hotline}
            alt={APP_INFO.NAME}
          />
          <span className="pc:hidden order-2">
            <CartDropdown />
          </span>
        </div>
      </div>
      <Separator className="pc:block hidden" />
      <Navigation breakpoint="pc" />
    </header>
  );
};

export default Header;
