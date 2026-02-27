"use client";

import { type ButtonHTMLAttributes, type ReactNode } from "react";

const baseClass =
  "p-2 min-h-[36px] min-w-[36px] h-[36px] w-[36px] rounded-[8px] text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100 transition-colors inline-flex items-center justify-center shrink-0 cursor-pointer";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  "aria-label": string;
  icon: ReactNode;
  className?: string;
}

export function IconButton({
  icon,
  className = "",
  ...props
}: IconButtonProps) {
  return (
    <button type="button" className={`${baseClass} ${className}`.trim()} {...props}>
      {icon}
    </button>
  );
}
