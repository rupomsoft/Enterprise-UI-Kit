"use client";

import {
  useRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { cn } from "@/app/lib/utils";

const DEFAULT_ROW_HEIGHT = 260;
const DEFAULT_ROW_GAP = 16;
const DEFAULT_OVERSCAN = 2;
/** Row height when in mobile list view (1 column) */
const MOBILE_LIST_ROW_HEIGHT = 100;
/** Row gap when in mobile list view (minimal vertical space between cards) */
const MOBILE_LIST_ROW_GAP = 0;

function getEffectiveColumns(width: number, columns: number): number {
  if (width < 640) return 1;
  if (width < 768) return Math.min(2, columns);
  if (width < 1024) return Math.min(3, columns);
  if (width < 1280) return Math.min(4, columns);
  return columns;
}

function getGridColsClass(cols: number): string {
  const map: Record<number, string> = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-2 sm:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4",
    5: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5",
  };
  return map[cols] ?? "grid-cols-2";
}

function useVirtualGridWindow(
  rowCount: number,
  rowHeight: number,
  rowGap: number,
  scrollTop: number,
  containerHeight: number,
  overscan: number
) {
  return useMemo(() => {
    const effectiveRowHeight = rowHeight + rowGap;
    const start = Math.max(0, Math.floor(scrollTop / effectiveRowHeight) - overscan);
    const visibleCount = Math.ceil(containerHeight / effectiveRowHeight);
    const end = Math.min(rowCount - 1, start + visibleCount + overscan * 2);
    const totalSize = rowCount * effectiveRowHeight;
    const virtualRows: { index: number; start: number }[] = [];
    for (let i = start; i <= end; i++) {
      virtualRows.push({ index: i, start: i * effectiveRowHeight });
    }
    return { virtualRows, totalSize };
  }, [rowCount, rowHeight, rowGap, scrollTop, containerHeight, overscan]);
}

export interface PosProductListProps<T> {
  /** List of items to display in a grid */
  data: T[];
  /** Unique key for each item */
  getKey: (item: T) => string | number;
  /** Render a single product/item (e.g. ProductCard). Second arg is { listView: true } on mobile list layout. */
  renderItem: (item: T, context?: { listView: boolean }) => ReactNode;
  /** Number of columns in the grid (e.g. 5) */
  columns?: number;
  /** Height of one grid row in pixels (card content). Default 260. */
  rowHeight?: number;
  /** Vertical gap between rows in pixels. Prevents card overlap. Default 16. */
  rowGap?: number;
  /** Grid gap (Tailwind class, e.g. 'gap-3 sm:gap-4') */
  gap?: string;
  /** Responsive grid class (e.g. 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'). If set, overrides columns for layout. */
  gridColsClass?: string;
  /** Container height. Default '90vh'. */
  height?: string;
  /** Extra class for the scroll container */
  className?: string;
}

export function PosProductList<T>({
  data,
  getKey,
  renderItem,
  columns = 5,
  rowHeight = DEFAULT_ROW_HEIGHT,
  rowGap = DEFAULT_ROW_GAP,
  gap = "gap-2 sm:gap-3 lg:gap-4",
  gridColsClass,
  height = "90vh",
  className,
}: PosProductListProps<T>) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(400);
  const [containerWidth, setContainerWidth] = useState(640);

  const effectiveColumns = useMemo(
    () => getEffectiveColumns(containerWidth, columns),
    [containerWidth, columns]
  );
  const effectiveRowHeight = effectiveColumns === 1 ? MOBILE_LIST_ROW_HEIGHT : rowHeight;
  const effectiveRowGap = effectiveColumns === 1 ? MOBILE_LIST_ROW_GAP : rowGap;

  const rowCount = useMemo(
    () => Math.ceil(data.length / effectiveColumns),
    [data.length, effectiveColumns]
  );

  const rows = useMemo(() => {
    const out: T[][] = [];
    for (let r = 0; r < rowCount; r++) {
      out.push(
        data.slice(r * effectiveColumns, r * effectiveColumns + effectiveColumns)
      );
    }
    return out;
  }, [data, rowCount, effectiveColumns]);

  const { virtualRows, totalSize } = useVirtualGridWindow(
    rowCount,
    effectiveRowHeight,
    effectiveRowGap,
    scrollTop,
    containerHeight,
    DEFAULT_OVERSCAN
  );

  const onScroll = useCallback(() => {
    const el = scrollRef.current;
    if (el) setScrollTop(el.scrollTop);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const measure = () => {
      setContainerHeight(el.clientHeight);
      setContainerWidth(el.clientWidth);
    };
    measure();
    setScrollTop(el.scrollTop);
    el.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, [onScroll]);

  const gridClass = gridColsClass ?? getGridColsClass(effectiveColumns);

  return (
    <div
      ref={scrollRef}
      className={cn("overflow-auto overscroll-contain p-3 sm:p-4 lg:p-6", className)}
      style={{ height }}
    >
      {data.length === 0 ? (
        <div className="flex items-center justify-center min-h-[200px] text-sm text-gray-500 dark:text-gray-400">
          No products.
        </div>
      ) : (
        <div
          className="relative w-full"
          style={{ height: `${totalSize}px` }}
        >
          {virtualRows.map(({ index: rowIndex, start }) => {
            const rowItems = rows[rowIndex] ?? [];
            return (
              <div
                key={rowIndex}
                className={cn("grid absolute left-0 right-0", gridClass, gap)}
                style={{
                  height: `${effectiveRowHeight}px`,
                  top: 0,
                  transform: `translateY(${start}px)`,
                }}
              >
                {rowItems.map((item) => (
                  <div key={getKey(item)} className="min-w-0 h-full">
                    {renderItem(item, { listView: effectiveColumns === 1 })}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
