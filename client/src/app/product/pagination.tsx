'use client';
import Pagination from '@/components/Pagination';
import { useViewport } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
type PagingProductProps = {
  currentPage: number;
  totalPages: number;
};

const PaginationProduct = ({ currentPage, totalPages }: PagingProductProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const view = useViewport();
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );
};

export default PaginationProduct;
