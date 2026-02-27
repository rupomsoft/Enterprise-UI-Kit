"use client";

import { type ReactNode } from "react";
import { Card } from "./Card";

export type AlertCardVariant = "success" | "warning" | "error" | "info";

const variantClass: Record<AlertCardVariant, string> = {
  success:
    "border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20",
  warning:
    "border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20",
  error: "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20",
  info: "border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20",
};

const iconClass: Record<AlertCardVariant, string> = {
  success: "text-emerald-600 dark:text-emerald-400",
  warning: "text-amber-600 dark:text-amber-400",
  error: "text-red-600 dark:text-red-400",
  info: "text-blue-600 dark:text-blue-400",
};

const titleClass: Record<AlertCardVariant, string> = {
  success: "text-emerald-800 dark:text-emerald-200",
  warning: "text-amber-800 dark:text-amber-200",
  error: "text-red-800 dark:text-red-200",
  info: "text-blue-800 dark:text-blue-200",
};

export interface AlertCardProps {
  variant: AlertCardVariant;
  /** Short title (e.g. Payment failed) */
  title: string;
  /** Optional longer description */
  description?: string;
  /** Optional icon; use variant-specific color for best look */
  icon?: ReactNode;
  className?: string;
}

export function AlertCard({
  variant,
  title,
  description,
  icon,
  className = "",
}: AlertCardProps) {
  return (
    <Card className={`${variantClass[variant]} ${className}`.trim()}>
      <div className="flex items-start gap-3">
        {icon != null && (
          <span className={`shrink-0 mt-0.5 ${iconClass[variant]}`}>{icon}</span>
        )}
        <div className="min-w-0">
          <p className={`text-sm font-semibold ${titleClass[variant]}`}>{title}</p>
          {description != null && description !== "" && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">{description}</p>
          )}
        </div>
      </div>
    </Card>
  );
}
