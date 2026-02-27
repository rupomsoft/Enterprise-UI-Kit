"use client";

import { cn } from "@/app/lib/utils";
import { type ReactNode } from "react";

const baseTh =
  "text-sm font-semibold text-[#1A1A1A] dark:text-gray-100 px-4 py-3";
const baseTd = "text-sm text-gray-700 dark:text-gray-300 px-4 py-3";
const borderCell = "border-b border-gray-200 dark:border-gray-700";
const borderCellLast = "last:border-b-0";
const stickyBg = "bg-gray-50 dark:bg-gray-700/30";

export interface TableColumn<T> {
  id: string;
  header: ReactNode;
  align?: "left" | "right" | "center";
  cell?: (row: T) => ReactNode;
  headerClassName?: string;
  cellClassName?: string;
  /** e.g. w-48 for progress column */
  width?: string;
  /** Optional: value used for sorting when column is sortable (defaults to row[id]) */
  sortValue?: (row: T) => string | number;
}

export type TableVariant = "bordered" | "default" | "striped";

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  getRowKey: (row: T) => string | number;
  variant?: TableVariant;
  hover?: boolean;
  minWidth?: string;
  className?: string;
  /** Sticky thead when inside a scroll container (e.g. TableCard with scrollHeight) */
  stickyHeader?: boolean;
}

function alignClass(align?: "left" | "right" | "center"): string {
  if (align === "right") return "text-right";
  if (align === "center") return "text-center";
  return "text-left";
}

export function Table<T>({
  columns,
  data,
  getRowKey,
  variant = "default",
  hover = false,
  minWidth,
  className = "",
  stickyHeader = false,
}: TableProps<T>) {
  const bordered = variant === "bordered";
  const striped = variant === "striped";
  const thBorder = bordered ? borderCell : "border-b border-gray-200 dark:border-gray-700";
  const tdBorder = bordered ? borderCell : "border-b border-gray-100 dark:border-gray-700";
  const thCell = bordered ? "border-r border-gray-200 dark:border-gray-700 last:border-r-0" : "";
  const tdCell = bordered ? "border-r border-gray-200 dark:border-gray-700 last:border-r-0" : "";

  return (
    <table
      className={cn("w-full min-w-0 border-collapse", className)}
      style={minWidth ? { minWidth } : undefined}
    >
      <thead className={cn(stickyHeader && "sticky top-0 z-10", stickyBg)}>
        <tr className={cn(thBorder, "bg-gray-50/50 dark:bg-gray-700/20", stickyHeader && stickyBg)}>
          {columns.map((col) => (
            <th
              key={col.id}
              className={cn(
                baseTh,
                thBorder,
                thCell,
                alignClass(col.align),
                stickyHeader && stickyBg,
                col.headerClassName
              )}
            >
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr
            key={getRowKey(row)}
            className={cn(
              tdBorder,
              borderCellLast,
              hover && "transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/30 cursor-pointer",
              striped && index % 2 === 1 && stickyBg
            )}
          >
            {columns.map((col) => (
              <td
                key={col.id}
                className={cn(
                  baseTd,
                  tdBorder,
                  tdCell,
                  borderCellLast,
                  alignClass(col.align),
                  col.cellClassName,
                  col.width
                )}
              >
                {col.cell ? col.cell(row) : String((row as Record<string, unknown>)[col.id] ?? "")}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
