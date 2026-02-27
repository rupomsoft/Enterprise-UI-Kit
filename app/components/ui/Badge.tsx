import { cn } from "@/app/lib/utils";
import { type ReactNode } from "react";

export type BadgeVariant =
  | "default"
  | "success"
  | "error"
  | "neutral"
  | "info"
  | "warning"
  | "success-outline"
  | "error-outline"
  | "warning-outline"
  | "info-outline"
  | "neutral-outline";

const variants: Record<BadgeVariant, string> = {
  default: "bg-gray-900 dark:bg-gray-200 text-white dark:text-gray-900",
  success:
    "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400",
  error: "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400",
  neutral: "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400",
  info: "bg-blue-500 dark:bg-blue-600 text-white",
  warning:
    "bg-amber-500 dark:bg-amber-600 text-white dark:text-gray-900",
  "success-outline":
    "border border-emerald-500 dark:border-emerald-400 bg-transparent text-emerald-700 dark:text-emerald-400",
  "error-outline":
    "border border-red-500 dark:border-red-400 bg-transparent text-red-700 dark:text-red-400",
  "warning-outline":
    "border border-amber-500 dark:border-amber-400 bg-transparent text-amber-700 dark:text-amber-400",
  "info-outline":
    "border border-blue-500 dark:border-blue-400 bg-transparent text-blue-700 dark:text-blue-400",
  "neutral-outline":
    "border border-gray-400 dark:border-gray-500 bg-transparent text-gray-600 dark:text-gray-400",
};

const roundedClass = {
  full: "rounded-full min-w-[20px] h-5 leading-none px-2",
  md: "rounded-[6px] px-2.5 py-0.5 min-h-[20px] leading-tight",
} as const;

export interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  rounded?: "full" | "md";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  rounded = "full",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center text-xs font-medium cursor-pointer",
        roundedClass[rounded],
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
