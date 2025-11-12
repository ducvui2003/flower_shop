'use client';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import React from 'react';

const SearchBar = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={cn('outline-primary flex items-stretch border', className)}
    >
      <Input
        placeholder="Tìm kiếm sản phẩm..."
        className="flex-1 rounded-none border-none p-0 shadow-none outline-none placeholder:text-gray-400 focus-visible:ring-0"
      />
      <div className="bg-primary hover-transition hover-opacity pc:basis-[100px] grid basis-[50px] place-items-center text-white hover:cursor-pointer">
        <Search />
      </div>
    </div>
  );
};

export default SearchBar;
