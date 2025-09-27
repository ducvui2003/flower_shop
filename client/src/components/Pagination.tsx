'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const MAX_VISIBLE_PAGES = 5;

  const generatePages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= MAX_VISIBLE_PAGES) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    const half = Math.floor(MAX_VISIBLE_PAGES / 2);
    let start = Math.max(2, currentPage - half);
    let end = Math.min(totalPages - 1, currentPage + half);

    // Adjust when near the start
    if (currentPage <= half + 1) {
      start = 2;
      end = MAX_VISIBLE_PAGES - 1;
    }

    // Adjust when near the end
    if (currentPage >= totalPages - half) {
      start = totalPages - (MAX_VISIBLE_PAGES - 2);
      end = totalPages - 1;
    }

    pages.push(1);

    if (start > 2) {
      pages.push('...');
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) {
      pages.push('...');
    }

    pages.push(totalPages);

    return pages;
  };

  const pages = generatePages();

  return (
    <div className="mt-8 flex items-center justify-center">
      <button
        className={`mx-1 rounded px-4 py-2 ${
          currentPage === 1
            ? 'cursor-not-allowed bg-gray-300'
            : 'bg-black font-bold text-primary'
        }`}
        disabled={currentPage === 1}
        onClick={() => onPageChange(1)}
      >
        Trang đầu
      </button>

      <button
        className={`mx-1 rounded px-4 py-2 ${
          currentPage === 1
            ? 'cursor-not-allowed bg-gray-300'
            : 'bg-black font-bold text-primary'
        }`}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        ‹
      </button>

      {pages.map((page, index) => (
        <button
          key={index}
          className={`mx-1 rounded px-4 py-2 ${
            currentPage === page
              ? 'bg-primary font-bold text-black'
              : 'bg-black text-white hover:bg-primary hover:text-black'
          }`}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={typeof page !== 'number'}
        >
          {page}
        </button>
      ))}

      <button
        className={`mx-1 rounded px-4 py-2 ${
          currentPage === totalPages
            ? 'cursor-not-allowed bg-gray-300'
            : 'bg-black font-bold text-primary'
        }`}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        ›
      </button>

      <button
        className={`mx-1 rounded px-4 py-2 ${
          currentPage === totalPages
            ? 'cursor-not-allowed bg-gray-300'
            : 'bg-black font-bold text-primary'
        }`}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(totalPages)}
      >
        Trang cuối
      </button>
    </div>
  );
}

export default Pagination;
