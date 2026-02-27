"use client";

import { ChevronDown } from "lucide-react";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const btnClass =
    "rounded-[8px] border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-2 min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 dark:focus-visible:ring-gray-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none touch-manipulation cursor-pointer";
  return (
    <nav className="flex flex-wrap items-center justify-center sm:justify-start gap-1" aria-label="Pagination">
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage <= 1}
        className={btnClass}
        aria-label="Previous page"
      >
        <ChevronDown className="w-4 h-4 rotate-90" aria-hidden />
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={`rounded-[8px] min-h-[44px] min-w-[44px] sm:min-h-8 sm:min-w-8 w-11 h-11 sm:w-8 sm:h-8 flex items-center justify-center text-sm font-medium transition-colors touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 dark:focus-visible:ring-gray-500 focus-visible:ring-offset-2 cursor-pointer ${
            currentPage === page
              ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900"
              : "border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          }`}
          aria-label={currentPage === page ? `Page ${page}, current` : `Go to page ${page}`}
          aria-current={currentPage === page ? "page" : undefined}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage >= totalPages}
        className={btnClass}
        aria-label="Next page"
      >
        <ChevronDown className="w-4 h-4 -rotate-90" aria-hidden />
      </button>
    </nav>
  );
}
