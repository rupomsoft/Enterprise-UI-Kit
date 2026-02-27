"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm min-w-0">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-x-2 shrink-0">
          {i > 0 && (
            <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500 shrink-0" />
          )}
          {item.href != null ? (
            <Link
              href={item.href}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 truncate max-w-[150px] sm:max-w-none"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 dark:text-gray-100 font-medium truncate max-w-[200px] sm:max-w-none">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
