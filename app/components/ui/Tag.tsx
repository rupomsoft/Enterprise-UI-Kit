"use client";

import { type ReactNode } from "react";

export type TagVariant = "default" | "filled" | "success" | "warning" | "error" | "neutral";

const variants: Record<TagVariant, string> = {
  default:
    "border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300",
  filled: "bg-gray-900 dark:bg-gray-200 text-white dark:text-gray-900",
  success:
    "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400",
  warning:
    "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400",
  error: "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400",
  neutral: "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400",
};

export interface TagProps {
  children: ReactNode;
  variant?: TagVariant;
  className?: string;
}

export function Tag({ children, variant = "default", className = "" }: TagProps) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full px-3 py-1 min-h-[24px] text-xs font-medium leading-tight ${variants[variant]} ${className}`.trim()}
    >
      {children}
    </span>
  );
}
