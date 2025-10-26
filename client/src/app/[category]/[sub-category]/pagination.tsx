'use client';
import Pagination from '@/components/Pagination';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
type PagingProductProps = {
  currentPage: number;
  totalPages: number;
};

type KeySearching = 'limit' | 'page';

const PaginationProduct = ({ currentPage, totalPages }: PagingProductProps) => {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(currentPage);
  const pathname = usePathname();
  const { replace } = useRouter();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    setPage(page);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Pagination
      currentPage={page}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );
};

export default PaginationProduct;
