"use client";

import { useRef, useState, useMemo, useCallback, useEffect, type ReactNode } from "react";
import { CalendarDays } from "lucide-react";
import { Card } from "./Card";
import { SearchInput } from "./SearchInput";
import { Popover } from "./Popover";
import { Button } from "./Button";
import { inputBase, labelBase } from "./styles";

const DEFAULT_ROW_HEIGHT = 48;
const DEFAULT_CONTAINER_HEIGHT = 400;
const DEFAULT_OVERSCAN = 8;
const SELECT_COLUMN_WIDTH = 48;

export type VirtualizedListViewSelectionMode = "single" | "multiple";

function useVirtualWindow(
  itemCount: number,
  rowHeight: number,
  scrollTop: number,
  containerHeight: number,
  overscan: number
) {
  return useMemo(() => {
    const start = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan);
    const visibleCount = Math.ceil(containerHeight / rowHeight);
    const end = Math.min(itemCount - 1, start + visibleCount + overscan * 2);
    const totalSize = itemCount * rowHeight;
    const virtualItems: { index: number; start: number }[] = [];
    for (let i = start; i <= end; i++) {
      virtualItems.push({ index: i, start: i * rowHeight });
    }
    return { virtualItems, totalSize };
  }, [itemCount, rowHeight, scrollTop, containerHeight, overscan]);
}

export interface VirtualizedListViewProps<T> {
  data: T[];
  getRowKey: (item: T) => string | number;
  /** Render each item. Receives the item; can return any React node (e.g. div with content). */
  renderItem: (item: T) => ReactNode;
  rowHeight?: number;
  containerHeight?: number;
  overscan?: number;
  title?: string;
  subtitle?: string;
  /** Keys to search in (e.g. ['name','email']). If provided, search input is shown. */
  searchKeys?: (keyof T)[];
  searchPlaceholder?: string;
  toolbarAction?: ReactNode;
  /** When true, adds a selection column. Requires selectedRowKeys + onSelectionChange. */
  selectable?: boolean;
  selectionMode?: VirtualizedListViewSelectionMode;
  selectedRowKeys?: (string | number)[];
  onSelectionChange?: (keys: (string | number)[]) => void;
  selectionBar?: ReactNode;
  /** Called when user applies date filter (from and to as YYYY-MM-DD). */
  onDateFilterChange?: (from: string, to: string) => void;
  footerText?: string;
  className?: string;
}

export function VirtualizedListView<T extends object>({
  data,
  getRowKey,
  renderItem,
  rowHeight = DEFAULT_ROW_HEIGHT,
  containerHeight = DEFAULT_CONTAINER_HEIGHT,
  overscan = DEFAULT_OVERSCAN,
  title,
  subtitle,
  searchKeys,
  searchPlaceholder = "Search",
  toolbarAction,
  selectable = false,
  selectionMode = "multiple",
  selectedRowKeys = [],
  onSelectionChange,
  selectionBar,
  onDateFilterChange,
  footerText,
  className = "",
}: VirtualizedListViewProps<T>) {
  const parentRef = useRef<HTMLDivElement>(null);
  const selectAllRef = useRef<HTMLInputElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [search, setSearch] = useState("");
  const [dateFilterOpen, setDateFilterOpen] = useState(false);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const selectedSet = useMemo(() => new Set(selectedRowKeys), [selectedRowKeys]);

  const handleDateFilterOk = useCallback(() => {
    const from = dateFrom || "";
    const to = dateTo || "";
    onDateFilterChange?.(from, to);
    setDateFilterOpen(false);
  }, [dateFrom, dateTo, onDateFilterChange]);

  const filtered = useMemo(() => {
    if (!search.trim() || !searchKeys?.length) return data;
    const q = search.trim().toLowerCase();
    return data.filter((row) =>
      searchKeys.some((k) =>
        String((row as Record<string, unknown>)[k as string] ?? "").toLowerCase().includes(q)
      )
    );
  }, [data, search, searchKeys]);

  const handleSelectAll = useCallback(() => {
    if (!onSelectionChange || selectionMode !== "multiple") return;
    const keys = filtered.map(getRowKey);
    const allSelected = keys.length > 0 && keys.every((k) => selectedSet.has(k));
    onSelectionChange(allSelected ? [] : keys);
  }, [onSelectionChange, selectionMode, filtered, getRowKey, selectedSet]);

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
    const keys = filtered.map(getRowKey);
    const allSelected = keys.length > 0 && keys.every((k) => selectedSet.has(k));
    const someSelected = keys.some((k) => selectedSet.has(k));
    (selectAllRef.current as HTMLInputElement).checked = allSelected;
    (selectAllRef.current as HTMLInputElement).indeterminate = someSelected && !allSelected;
  }, [selectable, selectionMode, filtered, getRowKey, selectedSet]);

  const { virtualItems, totalSize } = useVirtualWindow(
    filtered.length,
    rowHeight,
    scrollTop,
    containerHeight,
    overscan
  );

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
    title != null ||
    subtitle != null ||
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
              {(title != null || subtitle != null) && (
                <div className="min-w-0 shrink-0">
                  {title != null && (
                    <h2 className="text-lg font-bold text-[#1A1A1A] dark:text-gray-100 truncate">
                      {title}
                    </h2>
                  )}
                  {subtitle != null && (
                    <p className="mt-0.5 text-sm text-gray-600 dark:text-gray-400 truncate">
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
                        <label htmlFor="virtualized-lv-date-from" className={labelBase}>
                          From
                        </label>
                        <input
                          id="virtualized-lv-date-from"
                          type="date"
                          value={dateFrom}
                          onChange={(e) => setDateFrom(e.target.value)}
                          className={inputBase}
                        />
                      </div>
                      <div>
                        <label htmlFor="virtualized-lv-date-to" className={labelBase}>
                          To
                        </label>
                        <input
                          id="virtualized-lv-date-to"
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

      {selectable && onSelectionChange && (
        <div
          className="grid border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/20 shrink-0"
          style={{ gridTemplateColumns: `${SELECT_COLUMN_WIDTH}px 1fr` }}
        >
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
          <div className="px-4 py-3 text-sm font-semibold text-[#1A1A1A] dark:text-gray-100">
            Item
          </div>
        </div>
      )}

      <div
        ref={parentRef}
        className="overflow-auto overscroll-contain"
        style={{ height: containerHeight }}
      >
        {filtered.length === 0 ? (
          <div className="flex items-center justify-center h-full min-h-[120px] text-sm text-gray-500 dark:text-gray-400">
            No items match your search.
          </div>
        ) : (
        <div
          style={{
            height: `${totalSize}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {virtualItems.map((virtualRow) => {
            const item = filtered[virtualRow.index];
            const key = getRowKey(item);
            const selected = selectedSet.has(key);
            return (
              <div
                key={key}
                className="absolute left-0 w-full border-b border-gray-100 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors cursor-pointer"
                style={{
                  height: `${rowHeight}px`,
                  top: 0,
                  transform: `translateY(${virtualRow.start}px)`,
                  display: "grid",
                  gridTemplateColumns:
                    selectable && onSelectionChange
                      ? `${SELECT_COLUMN_WIDTH}px 1fr`
                      : "1fr",
                }}
              >
                {selectable && onSelectionChange && (
                  <div className="px-2 flex items-center justify-center border-r border-gray-100 dark:border-gray-700 shrink-0">
                    {selectionMode === "single" ? (
                      <input
                        type="radio"
                        name="_virtualized_list_select"
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
                <div className="px-4 flex items-center min-w-0 overflow-hidden">
                  {renderItem(item)}
                </div>
              </div>
            );
          })}
        </div>
        )}
      </div>

      {(footerText ?? true) && (
        <div className="p-3 border-t border-gray-100 dark:border-gray-700 bg-gray-50/30 dark:bg-gray-800/30">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {footerText ?? `${filtered.length} items · only visible rows rendered`}
          </span>
        </div>
      )}
    </Card>
  );
}
