"use client";

import { type ReactNode } from "react";
import { Card } from "@/app/components/ui/Card";
import { Pagination } from "@/app/components/ui/Pagination";

export interface TableCardPagination {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  /** Total number of items (for "Showing X–Y of Z") */
  totalItems?: number;
  /** Current page size (rows per page) */
  pageSize?: number;
  /** Called when user changes rows per page */
  onPageSizeChange?: (size: number) => void;
  /** Options for rows per page dropdown; e.g. [10, 25, 50] */
  pageSizeOptions?: number[];
}

export interface TableCardProps {
  children: ReactNode;
  /** Slot above the table (e.g. SearchInput, filters) */
  toolbar?: ReactNode;
  /** Pagination – shown in header (right) when paginationPosition is "header", else below */
  pagination?: TableCardPagination;
  paginationPosition?: "below" | "header";
  /** Footer text or content below the table */
  footer?: ReactNode;
  className?: string;
  /** Use when table body should scroll with sticky header (e.g. FixedHeaderTable) */
  scrollHeight?: string;
}

export function TableCard({
  children,
  toolbar,
  pagination,
  paginationPosition = "below",
  footer,
  className = "",
  scrollHeight,
}: TableCardProps) {
  const hasHeader = toolbar || (pagination && paginationPosition === "header");
  const tableWrapper = scrollHeight ? (
    <div
      className="overflow-auto flex-1 min-h-0"
      style={{ maxHeight: scrollHeight }}
    >
      {children}
    </div>
  ) : (
    <div className="overflow-x-auto">{children}</div>
  );

  return (
    <Card
      noPadding
      className={`overflow-hidden flex flex-col ${className}`.trim()}
    >
      {hasHeader && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 border-b border-gray-100 dark:border-gray-700 shrink-0">
          <div className="min-w-0 flex-1">{toolbar}</div>
          {pagination && paginationPosition === "header" && (
            <>
              <div className="flex flex-wrap items-center gap-3">
                {pagination.totalItems != null && (
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Showing{" "}
                    {pagination.totalItems === 0
                      ? "0"
                      : `${(pagination.currentPage - 1) * (pagination.pageSize ?? 10) + 1}–${Math.min(
                          pagination.currentPage * (pagination.pageSize ?? 10),
                          pagination.totalItems
                        )}`}{" "}
                    of {pagination.totalItems}
                  </span>
                )}
                {pagination.pageSize != null &&
                  pagination.onPageSizeChange != null &&
                  (pagination.pageSizeOptions ?? [10, 25, 50]).length > 0 && (
                    <div className="flex items-center gap-2">
                      <label htmlFor="table-page-size-header" className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                        Rows per page
                      </label>
                      <select
                        id="table-page-size-header"
                        value={String(pagination.pageSize)}
                        onChange={(e) => pagination.onPageSizeChange?.(Number(e.target.value))}
                        className="rounded-[8px] border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 px-2.5 py-1.5 min-w-0"
                      >
                        {(pagination.pageSizeOptions ?? [10, 25, 50]).map((n) => (
                          <option key={n} value={n}>{n}</option>
                        ))}
                      </select>
                    </div>
                  )}
              </div>
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={pagination.onPageChange}
              />
            </>
          )}
        </div>
      )}
      {tableWrapper}
      {pagination && paginationPosition === "below" && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 border-t border-gray-100 dark:border-gray-700">
          <div className="flex flex-wrap items-center gap-3 order-2 sm:order-1">
            {pagination.totalItems != null && (
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Showing{" "}
                {pagination.totalItems === 0
                  ? "0"
                  : `${(pagination.currentPage - 1) * (pagination.pageSize ?? 10) + 1}–${Math.min(
                      pagination.currentPage * (pagination.pageSize ?? 10),
                      pagination.totalItems
                    )}`}{" "}
                of {pagination.totalItems}
              </span>
            )}
            {pagination.pageSize != null &&
              pagination.onPageSizeChange != null &&
              (pagination.pageSizeOptions ?? [10, 25, 50]).length > 0 && (
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="table-page-size"
                    className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap"
                  >
                    Rows per page
                  </label>
                  <select
                    id="table-page-size"
                    value={String(pagination.pageSize)}
                    onChange={(e) => pagination.onPageSizeChange?.(Number(e.target.value))}
                    className="rounded-[8px] border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 px-2.5 py-1.5 min-w-0"
                  >
                    {(pagination.pageSizeOptions ?? [10, 25, 50]).map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
              )}
          </div>
          <div className="flex justify-center sm:justify-end order-1 sm:order-2">
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={pagination.onPageChange}
            />
          </div>
        </div>
      )}
      {footer && (
        <div className="p-3 border-t border-gray-100 dark:border-gray-700 bg-gray-50/30 dark:bg-gray-800/30">
          {footer}
        </div>
      )}
    </Card>
  );
}
