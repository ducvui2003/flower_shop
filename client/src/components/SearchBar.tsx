'use client';

import { cn } from '@/lib/utils';
import React, { useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { useLazySearchProductQuery } from '@/features/product/product.api';
import { useDebouncedCallback } from 'use-debounce';
import Link from '@/components/Link';

const SearchBar = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [action, { data, isLoading }] = useLazySearchProductQuery();

  const debounceSearch = useDebouncedCallback((search: string) => {
    action(search);
  }, 500);

  const handleSearch = (value: string) => {
    setInputValue(value);
    debounceSearch(value);
  };

  return (
    <div className="w-full">
      <div
        {...props}
        className={cn(
          'bg-muted flex size-full items-center rounded-full border border-gray-200 px-4 py-1 outline outline-transparent transition-all focus-within:border-slate-900 focus-within:bg-transparent',
          className,
        )}
      >
        <Input
          disabled={open}
          type="button"
          value="Tìm kiếm sản phẩm..."
          onClick={() => setOpen(true)}
          className="text-muted-foreground h-fit w-full border-none bg-transparent pr-2 pl-0 text-left shadow-none outline-none focus-visible:ring-0"
        />
        <Search className="text-muted-foreground focus-within:bg-primary focus-within:p-6" />
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Tìm kiếm sản phẩm..."
          value={inputValue}
          onValueChange={handleSearch}
        />
        <CommandList>
          {!inputValue && (
            <CommandEmpty>
              Kết quả tìm kiếm của bạn sẽ hiện thị tại đây
            </CommandEmpty>
          )}
          {inputValue && isLoading && (
            <CommandEmpty>Đang tìm kiếm ...</CommandEmpty>
          )}
          {inputValue &&
            !isLoading &&
            (data?.items.length === 0 ? (
              <CommandEmpty>Không tìm thấy sản phẩm phù hợp</CommandEmpty>
            ) : (
              <CommandGroup>
                {data?.items.map((item) => (
                  <CommandItem
                    key={item.id}
                    asChild
                    value={item.name}
                    className="data-[selected=true]:hover:bg-primary cursor-pointer data-[selected=true]:bg-transparent data-[selected=true]:hover:text-white"
                  >
                    <div>
                      <Link
                        href={`/product/detail/${item.id}`}
                        onClick={() => {
                          setOpen(false);
                          setInputValue('');
                        }}
                      >
                        {item.name}
                      </Link>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
        </CommandList>
      </CommandDialog>
    </div>
  );
};

export default SearchBar;
