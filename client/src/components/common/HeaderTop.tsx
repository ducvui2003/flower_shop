import CartDropdown from '@/components/CartDropdown';
import SearchBar from '@/components/SearchBar';
import TEXT from '@/utils/text.util';
import { ReactNode } from 'react';
type HeaderTopProps = {
  children?: ReactNode;
};

const HeaderTop = ({}: HeaderTopProps) => {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-gray-500">{TEXT.HEADER.TOP}</span>
      <div className="flex gap-3">
        <SearchBar className="w-[250px]" />
        <CartDropdown />
      </div>
    </div>
  );
};

export default HeaderTop;
