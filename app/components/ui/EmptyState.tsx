"use client";

import { type ReactNode } from "react";
import { Button } from "./Button";

export interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel = "Add item",
  onAction,
}: EmptyStateProps) {
  return (
    <div className={` flex flex-col items-center justify-center py-12 text-center`} >
      <div className="w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4 text-gray-400 dark:text-gray-500">
        {icon}
      </div>
      <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
        {title}
      </h3>
      {description != null && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-xs">
          {description}
        </p>
      )}
      {onAction != null && (
        <Button className="mt-4" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
