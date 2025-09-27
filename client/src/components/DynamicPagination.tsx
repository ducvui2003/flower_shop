import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'; // Hoặc từ thư viện icon bạn đang dùng

interface DynamicPaginationProps {
  totalPages: number;
  siblingCount?: number;
  page: number;
  setPage: (page: number) => void;
}

export function DynamicPagination({
  totalPages,
  siblingCount = 2,
  page,
  setPage,
}: DynamicPaginationProps) {
  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: (number | undefined)[] = [];
    pages.push(1);

    const startPage = Math.max(2, page - siblingCount);
    const endPage = Math.min(totalPages - 1, page + siblingCount);

    if (startPage > 2) {
      pages.push(undefined);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - 1) {
      pages.push(undefined);
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <Pagination>
      <PaginationContent>
        {page > 1 && (
          <>
            <PaginationItem
              onClick={() => setPage(1)}
              className="cursor-pointer"
            >
              <ChevronsLeft className="size-6 stroke-1" />
            </PaginationItem>
            <PaginationItem
              onClick={() => setPage(page - 1)}
              className="cursor-pointer"
            >
              <ChevronLeft className="size-5 stroke-1" />
            </PaginationItem>
          </>
        )}

        {pageNumbers.map((item, index) => {
          if (item === undefined) {
            return (
              <PaginationItem key={index}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={index}>
              <PaginationLink
                className="hover:text-white"
                onClick={() => setPage(item!)}
                isActive={page === item}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {page < totalPages && (
          <>
            <PaginationItem
              onClick={() => setPage(page + 1)}
              className="cursor-pointer"
            >
              <ChevronRight className="size-5 stroke-1" />
            </PaginationItem>
            <PaginationItem
              onClick={() => setPage(totalPages)}
              className="cursor-pointer"
            >
              <ChevronsRight className="size-6 stroke-1" />
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </Pagination>
  );
}
