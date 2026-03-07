import {
  Pagination as ShadCnPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Page = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
};

type Props = {
  onPageChange?: (page: number) => void;
  page: Page;
};

const Pagination = ({ onPageChange, page }: Props) => {
  const totalPages = page.totalPages || 1;
  const currentPage = page.currentPage || 1;

  const paginationRange = getPaginationRange(totalPages, currentPage);

  return (
    <ShadCnPagination>
      <PaginationContent>
        {/* Previous */}
        <PaginationItem>
          <PaginationPrevious
            onClick={() => currentPage > 1 && onPageChange?.(currentPage - 1)}
            aria-disabled={currentPage === 1}
          />
        </PaginationItem>

        {/* Pages */}
        {paginationRange.map((pageNum, index) =>
          pageNum === "dots" ? (
            <PaginationItem key={index}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={index}>
              <PaginationLink
                isActive={pageNum === currentPage}
                onClick={() => onPageChange?.(pageNum)}
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        {/* Next */}
        <PaginationItem>
          <PaginationNext
            onClick={() =>
              currentPage < totalPages && onPageChange?.(currentPage + 1)
            }
            aria-disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </ShadCnPagination>
  );
};

const getPaginationRange = (
  totalPages: number,
  currentPage: number,
  siblingCount: number = 1
): (number | "dots")[] => {
  const totalPageNumbers = siblingCount * 2 + 5;

  if (totalPageNumbers >= totalPages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

  const pages: (number | "dots")[] = [];

  pages.push(1);

  if (shouldShowLeftDots) {
    pages.push("dots");
  }

  for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
    pages.push(i);
  }

  if (shouldShowRightDots) {
    pages.push("dots");
  }

  pages.push(totalPages);

  return pages;
};

export default Pagination;
