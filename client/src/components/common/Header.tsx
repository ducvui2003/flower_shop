import CartDropdown from '@/components/CartDropdown';
import Logo from '@/components/Logo';
import Navigation from '@/components/Navigation';
import SearchBar from '@/components/SearchBar';
import { Separator } from '@/components/ui/separator';
import { APP_INFO } from '@/utils/const.util';
import Image from 'next/image';
import hotline from '/public/images/hotline-header.jpg';
import { getDeviceServer } from '@/lib/server.helper';

const Header = async () => {
  const device = await getDeviceServer();
  return (
    <header className="pt-3">
      <div id="header" className="container">
        <div className="pc:my-2 my-3 flex h-[80px] items-center justify-between gap-5">
          <Logo className="pc:order-0 order-1" />
          <SearchBar className="pc:flex pc:flex-1 hidden pl-2" />
          {device == 'mobile' && <Navigation breakpoint="mobile" />}
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
      {device == 'pc' && <Navigation breakpoint="pc" />}
    </header>
  );
};

export default Header;
