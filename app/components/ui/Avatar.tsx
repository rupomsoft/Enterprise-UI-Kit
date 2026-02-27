"use client";

import { type ReactNode } from "react";

export type AvatarSize = "sm" | "md" | "lg";

const sizeClass = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
};

export interface AvatarProps {
  children: ReactNode;
  size?: AvatarSize;
  className?: string;
  /** Optional background color (e.g. bg-emerald-500) */
  bgClass?: string;
}

export function Avatar({
  children,
  size = "md",
  className = "",
  bgClass = "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200",
}: AvatarProps) {
  return (
    <div
      className={`rounded-full flex items-center justify-center font-semibold shrink-0 overflow-hidden ${sizeClass[size]} ${bgClass} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
