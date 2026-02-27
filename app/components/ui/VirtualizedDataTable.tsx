"use client";

import { useRef, useState, useMemo, useCallback, useEffect, type ReactNode } from "react";
import { CalendarDays, ChevronDown, ChevronUp, MoreVertical } from "lucide-react";
import { Card } from "./Card";
import { SearchInput } from "./SearchInput";
import { DropdownMenu } from "./DropdownMenu";
import { Popover } from "./Popover";
import { Button } from "./Button";
import { inputBase, labelBase } from "./styles";

const DEFAULT_ROW_HEIGHT = 48;
const DEFAULT_CONTAINER_HEIGHT = 420;
const DEFAULT_OVERSCAN = 8;
const OPTIONS_COLUMN_WIDTH = "56px";
const SELECT_COLUMN_WIDTH = "48px";

export type VirtualizedDataTableSelectionMode = "single" | "multiple";

/** Menu item for the Options column; onClick receives the row. */
export interface VirtualizedDataTableActionMenuItem<T> {
  label: string;
  onClick?: (row: T) => void;
  variant?: "default" | "danger";
}

export interface VirtualizedDataTableColumn<T> {
  key: string;
  header: string;
  className?: string;
  minWidth?: string;
  /** If not set, row[key] is used */
  cell?: (row: T) => React.ReactNode;
  /** Value used for sorting when sortable is true (defaults to row[key]) */
  sortValue?: (row: T) => string | number;
}

function useVirtualWindow(
  rowCount: number,
  rowHeight: number,
  scrollTop: number,
  containerHeight: number,
  overscan: number
) {
  return useMemo(() => {
    const start = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan);
    const visibleCount = Math.ceil(containerHeight / rowHeight);
    const end = Math.min(rowCount - 1, start + visibleCount + overscan * 2);
    const totalSize = rowCount * rowHeight;
    const virtualItems: { index: number; start: number }[] = [];
    for (let i = start; i <= end; i++) {
      virtualItems.push({ index: i, start: i * rowHeight });
    }
    return { virtualItems, totalSize };
  }, [rowCount, rowHeight, scrollTop, containerHeight, overscan]);
}

export interface VirtualizedDataTableProps<T> {
  columns: VirtualizedDataTableColumn<T>[];
  data: T[];
  getRowKey: (row: T) => string | number;
  rowHeight?: number;
  containerHeight?: number;
  overscan?: number;
  /** Left side of toolbar */
  title?: string;
  /** Left side of toolbar, below title */
  subtitle?: string;
  /** @deprecated use subtitle */
  description?: string;
  /** Keys to search in; if provided, search input shown on right of toolbar */
  searchKeys?: (keyof T)[];
  searchPlaceholder?: string;
  /** Right side of toolbar: Button, IconButton, etc. */
  toolbarAction?: ReactNode;
  /** When true, column headers are clickable to sort asc/desc */
  sortable?: boolean;
  /** When provided, adds an Options column with 3-dot menu per row */
  actionColumnMenu?: (row: T) => VirtualizedDataTableActionMenuItem<T>[];
  /** When true, adds a selection column. Requires selectedRowKeys + onSelectionChange. */
  selectable?: boolean;
  /** "single" = radio per row; "multiple" = checkbox + select-all in header. Default "multiple". */
  selectionMode?: VirtualizedDataTableSelectionMode;
  selectedRowKeys?: (string | number)[];
  onSelectionChange?: (keys: (string | number)[]) => void;
  /** Rendered below the toolbar when selectable and there are selected rows (e.g. "3 selected" + actions). */
  selectionBar?: ReactNode;
  /** Called when user applies date filter (from and to as YYYY-MM-DD). */
  onDateFilterChange?: (from: string, to: string) => void;
  footerText?: string;
  className?: string;
}

export function VirtualizedDataTable<T extends object>({
  columns,
  data,
  getRowKey,
  rowHeight = DEFAULT_ROW_HEIGHT,
  containerHeight = DEFAULT_CONTAINER_HEIGHT,
  overscan = DEFAULT_OVERSCAN,
  title,
  subtitle,
  description,
  searchKeys,
  searchPlaceholder = "Search",
  toolbarAction,
  sortable = false,
  actionColumnMenu,
  selectable = false,
  selectionMode = "multiple",
  selectedRowKeys = [],
  onSelectionChange,
  selectionBar,
  onDateFilterChange,
  footerText,
  className = "",
}: VirtualizedDataTableProps<T>) {
  const parentRef = useRef<HTMLDivElement>(null);
  const selectAllRef = useRef<HTMLInputElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [search, setSearch] = useState("");
  const [dateFilterOpen, setDateFilterOpen] = useState(false);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sort, setSort] = useState<{ key: string; dir: "asc" | "desc" } | null>(null);
  const [openActionKey, setOpenActionKey] = useState<string | number | null>(null);
  const selectedSet = useMemo(() => new Set(selectedRowKeys), [selectedRowKeys]);

  const handleDateFilterOk = useCallback(() => {
    const from = dateFrom || "";
    const to = dateTo || "";
    onDateFilterChange?.(from, to);
    setDateFilterOpen(false);
  }, [dateFrom, dateTo, onDateFilterChange]);

  const sortKey = sort?.key ?? null;
  const sortDir = sort?.dir ?? "asc";
  const leftTitle = title ?? (subtitle == null && description == null ? "Virtualized table" : undefined);
  const leftSubtitle = subtitle ?? description;

  const filtered = useMemo(() => {
    if (!search.trim() || !searchKeys?.length) return data;
    const q = search.trim().toLowerCase();
    return data.filter((row) =>
      searchKeys.some((k) =>
        String((row as Record<string, unknown>)[k as string] ?? "").toLowerCase().includes(q)
      )
    );
  }, [data, search, searchKeys]);

  const sortedData = useMemo(() => {
    if (!sortable || !sortKey) return filtered;
    const col = columns.find((c) => c.key === sortKey);
    const getValue = col?.sortValue ?? ((row: T) => (row as Record<string, unknown>)[sortKey] as string | number);
    return [...filtered].sort((a, b) => {
      const va = getValue(a);
      const vb = getValue(b);
      const cmp =
        typeof va === "number" && typeof vb === "number"
          ? va - vb
          : String(va ?? "").localeCompare(String(vb ?? ""), undefined, { numeric: true });
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [filtered, sortable, sortKey, sortDir, columns]);

  const handleSelectAll = useCallback(() => {
    if (!onSelectionChange || selectionMode !== "multiple") return;
    const keys = sortedData.map(getRowKey);
    const allSelected = keys.length > 0 && keys.every((k) => selectedSet.has(k));
    onSelectionChange(allSelected ? [] : keys);
  }, [onSelectionChange, selectionMode, sortedData, getRowKey, selectedSet]);

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
    const keys = sortedData.map(getRowKey);
    const allSelected = keys.length > 0 && keys.every((k) => selectedSet.has(k));
    const someSelected = keys.some((k) => selectedSet.has(k));
    (selectAllRef.current as HTMLInputElement).checked = allSelected;
    (selectAllRef.current as HTMLInputElement).indeterminate = someSelected && !allSelected;
  }, [selectable, selectionMode, sortedData, getRowKey, selectedSet]);

  const displayColumns = useMemo(() => {
    const list: VirtualizedDataTableColumn<T>[] = [];
    if (selectable && onSelectionChange) {
      list.push({
        key: "_select",
        header: "_select",
        minWidth: SELECT_COLUMN_WIDTH,
        className: "justify-center",
      } as VirtualizedDataTableColumn<T>);
    }
    list.push(...columns);
    if (actionColumnMenu) {
      list.push({
        key: "_options",
        header: "Options",
        minWidth: OPTIONS_COLUMN_WIDTH,
        className: "justify-center",
      } as VirtualizedDataTableColumn<T>);
    }
    return list;
  }, [columns, actionColumnMenu, selectable, onSelectionChange]);

  const gridCols = useMemo(
    () =>
      displayColumns
        .map((c) =>
          c.minWidth
            ? `minmax(${c.minWidth}, ${c.key === "_options" ? "56px" : c.key === "_select" ? "48px" : "1fr"})`
            : "minmax(0, 1fr)"
        )
        .join(" "),
    [displayColumns]
  );

  const { virtualItems, totalSize } = useVirtualWindow(
    sortedData.length,
    rowHeight,
    scrollTop,
    containerHeight,
    overscan
  );

  const handleSort = useCallback((key: string) => {
    setSort((prev) =>
      prev?.key === key ? { key, dir: prev.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" }
    );
  }, []);

  const onScroll = useCallback(() => {
    const el = parentRef.current;
    if (el) setScrollTop(el.scrollTop);
  }, []);

  useEffect(() => {
    const el = parentRef.current;
    if (!el) return;
    setScrollTop(el.scrollTop);
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const hasToolbar =
    leftTitle != null ||
    leftSubtitle != null ||
    (searchKeys && searchKeys.length > 0) ||
    toolbarAction != null ||
    onDateFilterChange != null;
  const hasSelectionBar = selectable && selectedRowKeys.length > 0 && selectionBar != null;

  return (
    <Card noPadding className={`overflow-hidden ${className}`.trim()}>
      {(hasToolbar || hasSelectionBar) && (
        <div className="border-b border-gray-100 dark:border-gray-700">
      {hasToolbar && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 sm:p-5">
          {(leftTitle != null || leftSubtitle != null) && (
            <div className="min-w-0 shrink-0">
              {leftTitle != null && (
                <h2 className="text-lg font-bold text-[#1A1A1A] dark:text-gray-100 truncate">
                  {leftTitle}
                </h2>
              )}
              {leftSubtitle != null && (
                <p className="mt-0.5 text-sm text-gray-600 dark:text-gray-400 truncate">
                  {leftSubtitle}
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
                  onChange={(e) => setSearch(e.target.value)}
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
                    <label htmlFor="virtualized-dt-date-from" className={labelBase}>
                      From
                    </label>
                    <input
                      id="virtualized-dt-date-from"
                      type="date"
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                      className={inputBase}
                    />
                  </div>
                  <div>
                    <label htmlFor="virtualized-dt-date-to" className={labelBase}>
                      To
                    </label>
                    <input
                      id="virtualized-dt-date-to"
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
        <div className="flex flex-wrap items-center gap-2 px-4 sm:px-5 py-2 border-t border-gray-100 dark:border-gray-700">
          {selectionBar}
        </div>
      )}
        </div>
      )}

      <div
        className="grid border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/20 shrink-0"
        style={{ gridTemplateColumns: gridCols }}
      >
        {displayColumns.map((col) => {
          if (col.key === "_select") {
            return (
              <div
                key="_select"
                className="px-2 py-3 text-sm font-semibold text-[#1A1A1A] dark:text-gray-100 border-r border-gray-200 dark:border-gray-700 last:border-r-0 flex items-center justify-center"
              >
                {selectionMode === "multiple" ? (
                  <input
                    ref={selectAllRef}
                    type="checkbox"
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-gray-900 dark:bg-gray-800 focus-visible:ring-2 focus-visible:ring-gray-300 dark:focus-visible:ring-gray-500 shrink-0 cursor-pointer"
                    aria-label="Select all rows"
                  />
                ) : (
                  <span className="w-4 block" aria-hidden />
                )}
              </div>
            );
          }
          if (col.key === "_options") {
            return (
              <div
                key="_options"
                className="px-2 py-3 text-sm font-semibold text-[#1A1A1A] dark:text-gray-100 border-r border-gray-200 dark:border-gray-700 last:border-r-0 flex items-center justify-center"
              >
                Options
              </div>
            );
          }
          const isActive = sortable && sortKey === col.key;
          const headerContent =
            sortable && col.key !== "_options" ? (
              <button
                type="button"
                onClick={() => handleSort(col.key)}
                className="w-full flex items-center gap-1 text-left font-semibold text-[#1A1A1A] dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-[6px] -m-1 px-1 py-2 transition-colors"
                aria-sort={isActive ? (sortDir === "asc" ? "ascending" : "descending") : undefined}
                title={isActive ? `Sort ${sortDir === "asc" ? "descending" : "ascending"} (click to toggle)` : "Sort ascending"}
              >
                {col.header}
                {isActive &&
                  (sortDir === "asc" ? (
                    <ChevronUp className="w-4 h-4 shrink-0" aria-hidden />
                  ) : (
                    <ChevronDown className="w-4 h-4 shrink-0" aria-hidden />
                  ))}
              </button>
            ) : (
              col.header
            );
          return (
            <div
              key={col.key}
              className={`px-4 py-3 text-sm font-semibold text-[#1A1A1A] dark:text-gray-100 border-r border-gray-200 dark:border-gray-700 last:border-r-0 flex items-center ${col.className ?? ""}`.trim()}
            >
              {headerContent}
            </div>
          );
        })}
      </div>

      <div
        ref={parentRef}
        className="overflow-auto overscroll-contain"
        style={{ height: containerHeight }}
      >
        <div
          style={{
            height: `${totalSize}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {virtualItems.map((virtualRow) => {
            const row = sortedData[virtualRow.index];
            const isOptionsOpen = openActionKey === getRowKey(row);
            return (
              <div
                key={getRowKey(row)}
                className={`absolute left-0 w-full grid border-b border-gray-100 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors ${isOptionsOpen ? "z-[100]" : ""}`.trim()}
                style={{
                  height: `${rowHeight}px`,
                  top: 0,
                  transform: `translateY(${virtualRow.start}px)`,
                  gridTemplateColumns: gridCols,
                }}
              >
                {displayColumns.map((col) => {
                  if (col.key === "_select") {
                    const key = getRowKey(row);
                    const checked = selectedSet.has(key);
                    return (
                      <div
                        key="_select"
                        className="px-2 py-3 text-sm flex items-center justify-center border-r border-gray-100 dark:border-gray-700"
                      >
                        {selectionMode === "single" ? (
                          <input
                            type="radio"
                            name="_virtualized_table_select"
                            checked={checked}
                            onChange={() => handleSelectRow(key)}
                            className="w-4 h-4 border-gray-300 dark:border-gray-600 text-gray-900 dark:bg-gray-800 focus-visible:ring-2 focus-visible:ring-gray-300 dark:focus-visible:ring-gray-500 shrink-0 cursor-pointer"
                            aria-label="Select row"
                          />
                        ) : (
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => handleSelectRow(key)}
                            className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-gray-900 dark:bg-gray-800 focus-visible:ring-2 focus-visible:ring-gray-300 dark:focus-visible:ring-gray-500 shrink-0 cursor-pointer"
                            aria-label="Select row"
                          />
                        )}
                      </div>
                    );
                  }
                  if (col.key === "_options") {
                    return (
                      <div
                        key="_options"
                        className="px-2 py-3 text-sm flex items-center justify-center border-l border-gray-100 dark:border-gray-700"
                      >
                        <DropdownMenu
                          open={openActionKey === getRowKey(row)}
                          onOpenChange={(open) => setOpenActionKey(open ? getRowKey(row) : null)}
                          align="right"
                          trigger={
                            <button
                              type="button"
                              className="p-2 rounded-[8px] text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-300 transition-colors inline-flex items-center justify-center"
                              aria-label="Options"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          }
                          items={(actionColumnMenu?.(row) ?? []).map((item) => ({
                            label: item.label,
                            onClick: () => item.onClick?.(row),
                            variant: item.variant,
                          }))}
                        />
                      </div>
                    );
                  }
                  return (
                    <div
                      key={col.key}
                      className={`px-4 py-3 text-sm text-gray-700 dark:text-gray-300 truncate flex items-center ${col.className ?? ""}`.trim()}
                    >
                      {col.cell
                        ? col.cell(row)
                        : String((row as Record<string, unknown>)[col.key] ?? "")}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {(footerText ?? true) && (
        <div className="p-3 border-t border-gray-100 dark:border-gray-700 bg-gray-50/30 dark:bg-gray-800/30">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {footerText ?? `${sortedData.length} rows · only visible rows rendered`}
          </span>
        </div>
      )}
    </Card>
  );
}
