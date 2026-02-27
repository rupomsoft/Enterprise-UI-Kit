"use client";

import { cn } from "@/app/lib/utils";
import { hintClass } from "./styles";

export type ProgressBarVariant = "default" | "success" | "info" | "warning" | "error";

export interface ProgressBarProps {
  value: number;
  label?: string;
  variant?: ProgressBarVariant;
  showValue?: boolean;
  /** Compact mode: no label row, just the bar (e.g. for tables) */
  compact?: boolean;
}

const variantBarClass: Record<ProgressBarVariant, string> = {
  default: "bg-gray-900 dark:bg-gray-200",
  success: "bg-emerald-500 dark:bg-emerald-600",
  info: "bg-blue-500 dark:bg-blue-600",
  warning: "bg-amber-500 dark:bg-amber-600",
  error: "bg-red-500 dark:bg-red-600",
};

export function ProgressBar({
  value,
  label,
  variant = "default",
  showValue = true,
  compact = false,
}: ProgressBarProps) {
  const barClass = variantBarClass[variant];
  return (
    <div>
      {!compact && (label != null || showValue) && (
        <div className={cn(hintClass, "flex justify-between mb-1")}>
          {label != null && <span>{label}</span>}
          {showValue && <span>{value}%</span>}
        </div>
      )}
      <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${barClass}`}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  );
}
