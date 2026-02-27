"use client";

import { useRef, useState, useMemo, useCallback, useEffect, type ReactNode } from "react";
import { CalendarDays, ChevronDown, ChevronUp, MoreVertical } from "lucide-react";
import { Table } from "./Table";
import { TableCard } from "./TableCard";
import { SearchInput } from "./SearchInput";
import { DropdownMenu } from "./DropdownMenu";
import { Popover } from "./Popover";
import { Button } from "./Button";
import { inputBase, labelBase } from "./styles";
import type { TableColumn } from "./Table";

export type BorderedTableSelectionMode = "single" | "multiple";

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 25, 50];

/** Menu item for the action column 3-dot menu; onClick receives the row. */
export interface BorderedTableActionMenuItem<T> {
  label: string;
  onClick?: (row: T) => void;
  variant?: "default" | "danger";
}

export interface BorderedTableProps<T extends object> {
  columns: TableColumn<T>[];
  data: T[];
  getRowKey: (row: T) => string | number;
  /** Optional title on the left of the toolbar */
  title?: string;
  /** Optional subtitle/description on the left of the toolbar */
  subtitle?: string;
  /** Keys to search in (e.g. ['name','email']). If omitted, no search toolbar. */
  searchKeys?: (keyof T)[];
  searchPlaceholder?: string;
  /** Optional action button(s) on the right of the toolbar (e.g. IconButton or Button) */
  toolbarAction?: ReactNode;
  /** When provided, adds an action column with a 3-dot menu; function returns menu items per row */
  actionColumnMenu?: (row: T) => BorderedTableActionMenuItem<T>[];
  /** When true, table body scrolls with sticky header; use scrollHeight to set height (default "400px") */
  fixedHeader?: boolean;
  /** When true, use striped row variant */
  stripe?: boolean;
  /** Scroll height when fixedHeader is true (default "400px") */
  scrollHeight?: string;
  /** When true, column headers are clickable to sort ascending/descending */
  sortable?: boolean;
  /** Rows per page options; default [10, 25, 50] */
  pageSizeOptions?: number[];
  /** Optional controlled pagination */
  currentPage?: number;
  onPageChange?: (page: number) => void;
  /** When true, adds a selection column (checkbox or radio). Requires selectedRowKeys + onSelectionChange. */
  selectable?: boolean;
  /** "single" = radio per row; "multiple" = checkbox per row + select-all in header. Default "multiple". */
  selectionMode?: BorderedTableSelectionMode;
  /** Controlled selected row keys (getRowKey values). */
  selectedRowKeys?: (string | number)[];
  /** Called when selection changes. */
  onSelectionChange?: (keys: (string | number)[]) => void;
  /** Rendered above the table when selectable and there are selected rows (e.g. "3 selected" + Clear / Delete buttons). */
  selectionBar?: ReactNode;
  /** Called when user applies date filter (from and to as YYYY-MM-DD). */
  onDateFilterChange?: (from: string, to: string) => void;
}

export function BorderedTable<T extends object>({
  columns,
  data,
  getRowKey,
  title,
  subtitle,
  searchKeys,
  searchPlaceholder = "Search",
  toolbarAction,
  actionColumnMenu,
  fixedHeader = false,
  stripe = false,
  scrollHeight: scrollHeightProp,
  sortable = false,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  currentPage: controlledPage,
  onPageChange: controlledOnPageChange,
  selectable = false,
  selectionMode = "multiple",
  selectedRowKeys = [],
  onSelectionChange,
  selectionBar,
  onDateFilterChange,
}: BorderedTableProps<T>) {
  const scrollHeight = fixedHeader ? (scrollHeightProp ?? "400px") : undefined;
  const [search, setSearch] = useState("");
  const [dateFilterOpen, setDateFilterOpen] = useState(false);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const selectAllRef = useRef<HTMLInputElement>(null);
  const selectedSet = useMemo(() => new Set(selectedRowKeys), [selectedRowKeys]);
  const [pageSize, setPageSize] = useState(pageSizeOptions[0] ?? 10);
  const [internalPage, setInternalPage] = useState(1);
  const [openActionKey, setOpenActionKey] = useState<string | number | null>(null);
  const [sort, setSort] = useState<{ key: string; dir: "asc" | "desc" } | null>(null);
  const sortKey = sort?.key ?? null;
  const sortDir = sort?.dir ?? "asc";

  const filtered = useMemo(() => {
    if (!search.trim() || !searchKeys?.length) return data;
    const q = search.trim().toLowerCase();
    return data.filter((row) =>
      searchKeys.some((k) => String(row[k] ?? "").toLowerCase().includes(q))
    );
  }, [data, search, searchKeys]);

  const sortedFiltered = useMemo(() => {
    if (!sortable || !sortKey) return filtered;
    const col = columns.find((c) => c.id === sortKey);
    const getValue = col?.sortValue ?? ((row: T) => (row as Record<string, unknown>)[sortKey] as string | number);
    return [...filtered].sort((a, b) => {
      const va = getValue(a);
      const vb = getValue(b);
      const cmp = typeof va === "number" && typeof vb === "number"
        ? va - vb
        : String(va ?? "").localeCompare(String(vb ?? ""), undefined, { numeric: true });
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [filtered, sortable, sortKey, sortDir, columns]);

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

  const handleSort = useCallback((key: string) => {
    setSort((prev) =>
      prev?.key === key
        ? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "asc" }
    );
    setPage(1);
  }, [setPage]);

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

  useEffect(() => {
    if (!selectable || selectionMode !== "multiple" || !selectAllRef.current) return;
    const keys = sortedFiltered.map(getRowKey);
    const allSelected = keys.length > 0 && keys.every((k) => selectedSet.has(k));
    const someSelected = keys.some((k) => selectedSet.has(k));
    (selectAllRef.current as HTMLInputElement).checked = allSelected;
    (selectAllRef.current as HTMLInputElement).indeterminate = someSelected && !allSelected;
  }, [selectable, selectionMode, sortedFiltered, getRowKey, selectedSet]);

  const tableColumns = useMemo((): TableColumn<T>[] => {
    const base: TableColumn<T>[] = [];
    if (selectable && onSelectionChange) {
      base.push({
        id: "_select",
        header:
          selectionMode === "multiple" ? (
            <input
              ref={selectAllRef}
              type="checkbox"
              onChange={handleSelectAll}
              className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-gray-900 dark:bg-gray-800 focus-visible:ring-2 focus-visible:ring-gray-300 dark:focus-visible:ring-gray-500 shrink-0 cursor-pointer"
              aria-label="Select all rows"
            />
          ) : (
            <span className="w-4 block" aria-hidden />
          ),
        align: "center",
        width: "w-12",
        cellClassName: "py-1",
        cell: (row) => {
          const key = getRowKey(row);
          const checked = selectedSet.has(key);
          if (selectionMode === "single") {
            return (
              <input
                type="radio"
                name="_bordered_table_select"
                checked={checked}
                onChange={() => handleSelectRow(key)}
                className="w-4 h-4 border-gray-300 dark:border-gray-600 text-gray-900 dark:bg-gray-800 focus-visible:ring-2 focus-visible:ring-gray-300 dark:focus-visible:ring-gray-500 shrink-0 cursor-pointer"
                aria-label="Select row"
              />
            );
          }
          return (
            <input
              type="checkbox"
              checked={checked}
              onChange={() => handleSelectRow(key)}
              className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-gray-900 dark:bg-gray-800 focus-visible:ring-2 focus-visible:ring-gray-300 dark:focus-visible:ring-gray-500 shrink-0 cursor-pointer"
              aria-label="Select row"
            />
          );
        },
      });
    }
    base.push(
      ...columns.map((col) => {
        if (!sortable || col.id === "_action") return { ...col };
        const isActive = sortKey === col.id;
        const nextDir = isActive && sortDir === "asc" ? "desc" : "asc";
        const ariaSort = isActive ? (sortDir === "asc" ? "ascending" : "descending") : undefined;
        const headerContent = (
          <button
            type="button"
            onClick={() => handleSort(col.id)}
            className="w-full flex items-center justify-center gap-1 text-left font-semibold text-[#1A1A1A] dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-[6px] -m-1 px-1 py-2 transition-colors"
            style={{ justifyContent: col.align === "right" ? "flex-end" : col.align === "center" ? "center" : "flex-start" }}
            aria-sort={ariaSort}
            title={isActive ? `Sort ${nextDir === "asc" ? "ascending" : "descending"} (click to toggle)` : `Sort ascending`}
          >
            {col.header}
            {isActive && (
              sortDir === "asc" ? (
                <ChevronUp className="w-4 h-4 shrink-0" aria-hidden />
              ) : (
                <ChevronDown className="w-4 h-4 shrink-0" aria-hidden />
              )
            )}
          </button>
        );
        return { ...col, header: headerContent };
      })
    );
    if (actionColumnMenu) {
      base.push({
        id: "_action",
        header: "",
        align: "center",
        width: "w-12",
        cellClassName: "py-1",
        cell: (row) => {
          const key = getRowKey(row);
          const items = actionColumnMenu(row);
          const dropdownItems = items.map((item) => ({
            label: item.label,
            onClick: () => item.onClick?.(row),
            variant: item.variant,
          }));
          return (
            <DropdownMenu
              open={openActionKey === key}
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
              items={dropdownItems}
            />
          );
        },
      });
    }
    return base;
  }, [
    columns,
    actionColumnMenu,
    getRowKey,
    openActionKey,
    sortable,
    sortKey,
    sortDir,
    handleSort,
    selectable,
    onSelectionChange,
    selectionMode,
    selectedSet,
    handleSelectAll,
    handleSelectRow,
  ]);

  const hasToolbar =
    title != null ||
    subtitle != null ||
    (searchKeys && searchKeys.length > 0) ||
    toolbarAction != null ||
    onDateFilterChange != null;
  const hasSelectionBar = selectable && selectedRowKeys.length > 0 && selectionBar != null;
  return (
    <TableCard
      toolbar={
        hasToolbar || hasSelectionBar ? (
          <div className="flex flex-col gap-0 w-full">
            {hasToolbar && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 w-full">
            {(title != null || subtitle != null) && (
              <div className="min-w-0 shrink-0">
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
              {onDateFilterChange != null && (
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
                      <label htmlFor="bordered-table-date-from" className={labelBase}>
                        From
                      </label>
                      <input
                        id="bordered-table-date-from"
                        type="date"
                        value={dateFrom}
                        onChange={(e) => setDateFrom(e.target.value)}
                        className={inputBase}
                      />
                    </div>
                    <div>
                      <label htmlFor="bordered-table-date-to" className={labelBase}>
                        To
                      </label>
                      <input
                        id="bordered-table-date-to"
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
              )}
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
      scrollHeight={scrollHeight}
    >
      <Table
        columns={tableColumns}
        data={pageData}
        getRowKey={getRowKey}
        variant={stripe ? "striped" : "bordered"}
        stickyHeader={fixedHeader}
      />
    </TableCard>
  );
}
