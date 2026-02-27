"use client";

import { cn } from "@/app/lib/utils";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

const baseClass =
  "inline-flex items-center justify-center gap-2 flex-shrink-0 rounded-[8px] px-4 min-h-[36px] h-[36px] text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-300 dark:focus-visible:ring-gray-500 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none";

const variants = {
  primary:
    "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 focus-visible:ring-gray-400 dark:focus-visible:ring-gray-400",
  secondary:
    "border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus-visible:ring-gray-300 dark:focus-visible:ring-gray-500",
  danger:
    "border border-red-200 dark:border-red-800 bg-white dark:bg-gray-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 focus-visible:ring-red-300 dark:focus-visible:ring-red-600",
  "primary-outline":
    "border border-gray-900 dark:border-gray-100 bg-transparent text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 focus-visible:ring-gray-400 dark:focus-visible:ring-gray-400",
  "secondary-outline":
    "border border-gray-200 dark:border-gray-600 bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus-visible:ring-gray-300 dark:focus-visible:ring-gray-500",
  "danger-outline":
    "border border-red-600 dark:border-red-400 bg-transparent text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 focus-visible:ring-red-300 dark:focus-visible:ring-red-600",
} as const;

export type ButtonVariant = keyof typeof variants;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(baseClass, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
