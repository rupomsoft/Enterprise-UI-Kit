"use client";

import { type ReactNode } from "react";
import { Card } from "./Card";
import { Link } from "./Link";

export interface ListCardProps {
  /** Card title (e.g. Recent Orders) */
  title: string;
  /** List item nodes (e.g. simple rows) */
  items: ReactNode[];
  /** "View All" link; label defaults to "View All" */
  viewAll: {
    href: string;
    label?: string;
  };
  className?: string;
}

export function ListCard({ title, items, viewAll, className = "" }: ListCardProps) {
  return (
    <Card className={className}>
      <div className="flex flex-col">
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
          <Link href={viewAll.href} className="shrink-0">
            {viewAll.label ?? "View All"}
          </Link>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700 -mx-4 sm:-mx-5">
          {items.map((item, i) => (
            <li key={i} className="px-4 sm:px-5">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
