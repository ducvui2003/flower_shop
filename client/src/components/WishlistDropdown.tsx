'use client';
import ClientIcon from '@/components/ClientIcon';
import Link from '@/components/Link';
import { ReactNode } from 'react';
type WishlistDropdownProps = {
  children: ReactNode;
};

const WishlistDropdown = () => {
  return (
    <div className="bg-muted size-11 cursor-pointer rounded-full border border-gray-200 p-3 hover:opacity-50">
      <Link href="/user/wishlist" className="relative">
        <ClientIcon icon={'lucide:heart'} size={22} />
      </Link>
    </div>
  );
};

export default WishlistDropdown;
