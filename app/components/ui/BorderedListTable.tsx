"use client";

import { useRef, useState, useMemo, useCallback, useEffect, type ReactNode } from "react";
import { MoreVertical, CalendarDays } from "lucide-react";
import { TableCard } from "./TableCard";
import { SearchInput } from "./SearchInput";
import { DropdownMenu } from "./DropdownMenu";
import { Popover } from "./Popover";
import { Button } from "./Button";
import { inputBase, labelBase } from "./styles";

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 25, 50];
const SELECT_COLUMN_WIDTH = 48;
const ACTION_COLUMN_WIDTH = 48;

export type BorderedListTableSelectionMode = "single" | "multiple";

/** Menu item for the row 3-dot menu; onClick receives the row. */
export interface BorderedListTableActionMenuItem<T> {
  label: string;
  onClick?: (row: T) => void;
  variant?: "default" | "danger";
}

export interface BorderedListTableProps<T extends object> {
  data: T[];
  getRowKey: (row: T) => string | number;
  /** Render each list item (e.g. image, name, price, action buttons). */
  renderItem: (row: T) => ReactNode;
  /** Height of each list row in px. Default 56. */
  rowHeight?: number;
  title?: string;
  subtitle?: string;
  searchKeys?: (keyof T)[];
  searchPlaceholder?: string;
  toolbarAction?: ReactNode;
  /** When provided, adds a 3-dot action menu per row. */
  actionColumnMenu?: (row: T) => BorderedListTableActionMenuItem<T>[];
  pageSizeOptions?: number[];
  currentPage?: number;
  onPageChange?: (page: number) => void;
  selectable?: boolean;
  selectionMode?: BorderedListTableSelectionMode;
  selectedRowKeys?: (string | number)[];
  onSelectionChange?: (keys: (string | number)[]) => void;
  selectionBar?: ReactNode;
  /** When true, alternating rows have a subtle background. */
  stripe?: boolean;
  /** Optional key to sort the list by (sorts filtered data before pagination). */
  sortKey?: keyof T;
  /** Custom sort value when sortKey is set. Defaults to row[sortKey]. */
  sortValue?: (row: T) => string | number;
  /** Called when user applies date filter (from and to as YYYY-MM-DD). */
  onDateFilterChange?: (from: string, to: string) => void;
  className?: string;
}

export function BorderedListTable<T extends object>({
  data,
  getRowKey,
  renderItem,
  rowHeight = 56,
  title,
  subtitle,
  searchKeys,
  searchPlaceholder = "Search",
  toolbarAction,
  actionColumnMenu,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  currentPage: controlledPage,
  onPageChange: controlledOnPageChange,
  selectable = false,
  selectionMode = "multiple",
  selectedRowKeys = [],
  onSelectionChange,
  selectionBar,
  stripe = false,
  sortKey,
  sortValue,
  onDateFilterChange,
  className = "",
}: BorderedListTableProps<T>) {
  const [search, setSearch] = useState("");
  const [dateFilterOpen, setDateFilterOpen] = useState(false);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const selectAllRef = useRef<HTMLInputElement>(null);
  const selectedSet = useMemo(() => new Set(selectedRowKeys), [selectedRowKeys]);
  const [pageSize, setPageSize] = useState(pageSizeOptions[0] ?? 10);
  const [internalPage, setInternalPage] = useState(1);
  const [openActionKey, setOpenActionKey] = useState<string | number | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const filtered = useMemo(() => {
    if (!search.trim() || !searchKeys?.length) return data;
    const q = search.trim().toLowerCase();
    return data.filter((row) =>
      searchKeys.some((k) => String(row[k] ?? "").toLowerCase().includes(q))
    );
  }, [data, search, searchKeys]);

  const sortedFiltered = useMemo(() => {
    if (!sortKey) return filtered;
    const getVal = sortValue ?? ((row: T) => (row as Record<string, unknown>)[sortKey as string] as string | number);
    return [...filtered].sort((a, b) => {
      const va = getVal(a);
      const vb = getVal(b);
      const cmp =
        typeof va === "number" && typeof vb === "number"
          ? va - vb
          : String(va ?? "").localeCompare(String(vb ?? ""), undefined, { numeric: true });
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir, sortValue]);

  const totalPages = Math.max(1, Math.ceil(sortedFiltered.length / pageSize));
  const useControlled = controlledOnPageChange != null;
  const page = useControlled ? (controlledPage ?? 1) : internalPage;
  const setPage = useControlled ? (controlledOnPageChange ?? (() => {})) : setInternalPage;

  const handleDateFilterOk = useCallback(() => {
    const from = dateFrom || "";
    const to = dateTo || "";
    onDateFilterChange?.(from, to);
    setDateFilterOpen(false);
    setPage(1);
  }, [dateFrom, dateTo, onDateFilterChange, setPage]);

  const safePage = Math.min(Math.max(1, page), totalPages);
  const pageData = useMemo(
    () => sortedFiltered.slice((safePage - 1) * pageSize, safePage * pageSize),
    [sortedFiltered, safePage, pageSize]
  );

  const handleSelectAll = useCallback(() => {
    if (!onSelectionChange || selectionMode !== "multiple") return;
    const keys = sortedFiltered.map(getRowKey);
    const allSelected = keys.length > 0 && keys.every((k) => selectedSet.has(k));
    onSelectionChange(allSelected ? [] : keys);
  }, [onSelectionChange, selectionMode, sortedFiltered, getRowKey, selectedSet]);

  const handleSelectRow = useCallback(
    (key: string | number) => {
      if (!onSelectionChange) return;
      if (selectionMode === "single") {
        onSelectionChange(selectedSet.has(key) ? [] : [key]);
        return;
      }
      const next = new Set(selectedRowKeys);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      onSelectionChange(Array.from(next));
    },
    [onSelectionChange, selectionMode, selectedRowKeys]
  );

  const toggleSort = useCallback(() => {
    if (!sortKey) return;
    setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    setPage(1);
  }, [sortKey, setPage]);

  useEffect(() => {
    if (!selectable || selectionMode !== "multiple" || !selectAllRef.current) return;
    const keys = sortedFiltered.map(getRowKey);
    const allSelected = keys.length > 0 && keys.every((k) => selectedSet.has(k));
    const someSelected = keys.some((k) => selectedSet.has(k));
    (selectAllRef.current as HTMLInputElement).checked = allSelected;
    (selectAllRef.current as HTMLInputElement).indeterminate = someSelected && !allSelected;
  }, [selectable, selectionMode, sortedFiltered, getRowKey, selectedSet]);

  const hasToolbar =
    title != null ||
    subtitle != null ||
    (searchKeys && searchKeys.length > 0) ||
    toolbarAction != null ||
    sortKey != null;
  const hasSelectionBar = selectable && selectedRowKeys.length > 0 && selectionBar != null;

  return (
    <TableCard
      className={className}
      toolbar={
        hasToolbar || hasSelectionBar ? (
          <div className="flex flex-col gap-0 w-full">
            {hasToolbar && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 w-full">
                {(title != null || subtitle != null || sortKey != null) && (
                  <div className="min-w-0 shrink-0 flex items-center gap-3">
                    <div className="min-w-0">
                      {title != null && (
                        <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 truncate">
                          {title}
                        </h3>
                      )}
                      {subtitle != null && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                          {subtitle}
                        </p>
                      )}
                    </div>
                    {sortKey != null && (
                      <button
                        type="button"
                        onClick={toggleSort}
                        className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 underline shrink-0"
                      >
                        Sort {sortDir === "asc" ? "↑" : "↓"}
                      </button>
                    )}
                  </div>
                )}
                <div className="flex items-center justify-end gap-2 shrink-0">
                  {searchKeys && searchKeys.length > 0 && (
                    <div className="w-full sm:w-64 shrink-0">
                      <SearchInput
                        placeholder={searchPlaceholder}
                        value={search}
                        onChange={(e) => {
                          setSearch(e.target.value);
                          setPage(1);
                        }}
                      />
                    </div>
                  )}
                  <Popover
                    open={dateFilterOpen}
                    onOpenChange={setDateFilterOpen}
                    trigger={
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-[8px] border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 h-[36px] min-h-[36px] text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer shrink-0"
                        aria-label="Date filter"
                      >
                        <CalendarDays className="w-4 h-4" aria-hidden />
                        <span className="hidden sm:inline">Date filter</span>
                      </button>
                    }
                  >
                    <div className="space-y-3 min-w-[200px]">
                      <div>
                        <label htmlFor="bordered-list-date-from" className={labelBase}>
                          From
                        </label>
                        <input
                          id="bordered-list-date-from"
                          type="date"
                          value={dateFrom}
                          onChange={(e) => setDateFrom(e.target.value)}
                          className={inputBase}
                        />
                      </div>
                      <div>
                        <label htmlFor="bordered-list-date-to" className={labelBase}>
                          To
                        </label>
                        <input
                          id="bordered-list-date-to"
                          type="date"
                          value={dateTo}
                          onChange={(e) => setDateTo(e.target.value)}
                          className={inputBase}
                        />
                      </div>
                      <Button onClick={handleDateFilterOk} className="w-full">
                        OK
                      </Button>
                    </div>
                  </Popover>
                  {toolbarAction != null && <div className="shrink-0">{toolbarAction}</div>}
                </div>
              </div>
            )}
            {hasSelectionBar && (
              <div className="flex flex-wrap items-center gap-2 py-2 border-t border-gray-100 dark:border-gray-700">
                {selectionBar}
              </div>
            )}
          </div>
        ) : undefined
      }
      pagination={{
        currentPage: safePage,
        totalPages,
        onPageChange: setPage,
        totalItems: filtered.length,
        pageSize,
        onPageSizeChange: (size) => {
          setPageSize(size);
          setPage(1);
        },
        pageSizeOptions,
      }}
      paginationPosition="below"
    >
      {/* List header */}
      {(selectable && onSelectionChange) || actionColumnMenu ? (
        <div
          className="grid border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/20 shrink-0"
          style={{
            gridTemplateColumns: [
              selectable && onSelectionChange ? `${SELECT_COLUMN_WIDTH}px` : "",
              "1fr",
              actionColumnMenu ? `${ACTION_COLUMN_WIDTH}px` : "",
            ]
              .filter(Boolean)
              .join(" "),
          }}
        >
          {selectable && onSelectionChange && (
            <div className="px-2 py-3 flex items-center justify-center border-r border-gray-200 dark:border-gray-700">
              {selectionMode === "multiple" ? (
                <input
                  ref={selectAllRef}
                  type="checkbox"
                  onChange={handleSelectAll}
                  className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-gray-900 dark:bg-gray-800 focus-visible:ring-2 focus-visible:ring-gray-300 dark:focus-visible:ring-gray-500 shrink-0 cursor-pointer"
                  aria-label="Select all"
                />
              ) : (
                <span className="w-4 block" aria-hidden />
              )}
            </div>
          )}
          <div className="px-4 py-3 text-sm font-semibold text-[#1A1A1A] dark:text-gray-100 border-r border-gray-200 dark:border-gray-700 last:border-r-0">
            Item
          </div>
          {actionColumnMenu && (
            <div className="px-2 py-3 text-sm font-semibold text-[#1A1A1A] dark:text-gray-100 flex items-center justify-center">
              Actions
            </div>
          )}
        </div>
      ) : null}

      {/* List body */}
      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {pageData.map((row) => {
          const key = getRowKey(row);
          const selected = selectedSet.has(key);
          const isOptionsOpen = openActionKey === key;
          return (
            <div
              key={key}
              className={`grid transition-colors cursor-pointer ${
                stripe ? "even:bg-gray-50/50 dark:even:bg-gray-800/30" : ""
              } hover:bg-gray-50 dark:hover:bg-gray-700/30 ${isOptionsOpen ? "z-[100] relative" : ""}`}
              style={{
                gridTemplateColumns: [
                  selectable && onSelectionChange ? `${SELECT_COLUMN_WIDTH}px` : "",
                  "1fr",
                  actionColumnMenu ? `${ACTION_COLUMN_WIDTH}px` : "",
                ]
                  .filter(Boolean)
                  .join(" "),
                minHeight: rowHeight,
              }}
            >
              {selectable && onSelectionChange && (
                <div className="px-2 flex items-center justify-center border-r border-gray-100 dark:border-gray-700 shrink-0">
                  {selectionMode === "single" ? (
                    <input
                      type="radio"
                      name="_bordered_list_select"
                      checked={selected}
                      onChange={() => handleSelectRow(key)}
                      className="w-4 h-4 border-gray-300 dark:border-gray-600 text-gray-900 dark:bg-gray-800 focus-visible:ring-2 focus-visible:ring-gray-300 dark:focus-visible:ring-gray-500 shrink-0 cursor-pointer"
                      aria-label="Select row"
                    />
                  ) : (
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => handleSelectRow(key)}
                      className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-gray-900 dark:bg-gray-800 focus-visible:ring-2 focus-visible:ring-gray-300 dark:focus-visible:ring-gray-500 shrink-0 cursor-pointer"
                      aria-label="Select row"
                    />
                  )}
                </div>
              )}
              <div className="px-4 flex items-center min-w-0 overflow-hidden border-r border-gray-100 dark:border-gray-700 last:border-r-0">
                {renderItem(row)}
              </div>
              {actionColumnMenu && (
                <div className="px-2 flex items-center justify-center border-l border-gray-100 dark:border-gray-700 shrink-0">
                  <DropdownMenu
                    open={isOptionsOpen}
                    onOpenChange={(open) => setOpenActionKey(open ? key : null)}
                    align="right"
                    trigger={
                      <button
                        type="button"
                        className="p-2 rounded-[8px] text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-300 transition-colors inline-flex items-center justify-center"
                        aria-label="Actions"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    }
                    items={actionColumnMenu(row).map((item) => ({
                      label: item.label,
                      onClick: () => item.onClick?.(row),
                      variant: item.variant,
                    }))}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </TableCard>
  );
}
