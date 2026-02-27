"use client";

import { type ReactNode } from "react";

export type AlertVariant = "success" | "warning" | "error";

const variantClass: Record<AlertVariant, string> = {
  success:
    "border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20",
  warning:
    "border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20",
  error: "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20",
};

const iconClass: Record<AlertVariant, string> = {
  success: "text-emerald-600 dark:text-emerald-400",
  warning: "text-amber-600 dark:text-amber-400",
  error: "text-red-600 dark:text-red-400",
};

const titleClass: Record<AlertVariant, string> = {
  success: "text-emerald-800 dark:text-emerald-200",
  warning: "text-amber-800 dark:text-amber-200",
  error: "text-red-800 dark:text-red-200",
};

export interface AlertProps {
  variant: AlertVariant;
  title: string;
  description?: string;
  icon?: ReactNode;
}

export function Alert({ variant, title, description, icon }: AlertProps) {
  return (
    <div
      role="alert"
      className={`rounded-[8px] border px-4 py-3 flex items-start gap-3 min-w-0 ${variantClass[variant]}`}
    >
      {icon != null && (
        <span className={`shrink-0 mt-0.5 ${iconClass[variant]}`} aria-hidden>{icon}</span>
      )}
      <div className="min-w-0 flex-1">
        <p className={`text-sm font-medium ${titleClass[variant]}`}>{title}</p>
        {description != null && (
          <p className={`text-xs mt-0.5 ${titleClass[variant]} opacity-90`}>{description}</p>
        )}
      </div>
    </div>
  );
}
