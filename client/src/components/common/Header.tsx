import CartDropdown from '@/components/CartDropdown';
import Logo from '@/components/Logo';
import Navigation from '@/components/Navigation';
import SearchBar from '@/components/SearchBar';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import TEXT from '@/utils/text.util';

const Header = async () => {
  return (
    <header className="py-3" style={{ '--header-height': '60px' } as any}>
      <div className="container">
        <div className="relative my-2 flex h-[80px] items-center justify-between">
          <span className="pc:block hidden text-gray-500">
            {TEXT.HEADER.TOP}
          </span>
          <Logo className={cn('absolute top-1/2 left-1/2 -translate-1/2')} />
          <div className="pc:flex hidden gap-3">
            <SearchBar className="w-[150px]" />
            <CartDropdown />
          </div>
          <Navigation breakpoint="mobile" />
        </div>
      </div>
      <Separator className="pc:block hidden" />
      <Navigation breakpoint="pc" />
    </header>
  );
};

export default Header;
