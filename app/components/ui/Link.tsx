"use client";

import NextLink from "next/link";
import { type ReactNode } from "react";

export interface LinkProps {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  underline?: boolean;
}

const baseClass =
  "text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-400 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-gray-300 dark:focus-visible:ring-gray-500 rounded-[4px]";

export function Link({
  href,
  children,
  icon,
  className = "",
  underline = false,
}: LinkProps) {
  const cls = `${baseClass} ${underline ? "underline underline-offset-2" : ""} ${icon ? "inline-flex items-center gap-1.5 min-w-0" : ""} ${className}`.trim();
  return (
    <NextLink href={href} className={cls}>
      {children}
      {icon != null && <span className="shrink-0" aria-hidden>{icon}</span>}
    </NextLink>
  );
}
