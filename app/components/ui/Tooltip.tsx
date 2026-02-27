"use client";

import { type ReactNode } from "react";

const tooltipClass =
  "pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 rounded-[6px] bg-gray-900 dark:bg-gray-200 px-2.5 py-1.5 text-xs font-medium text-white dark:text-gray-900 opacity-0 transition-opacity group-hover:opacity-100 whitespace-nowrap";

export interface TooltipProps {
  trigger: ReactNode;
  content: ReactNode;
}

export function Tooltip({ trigger, content }: TooltipProps) {
  return (
    <span className="group relative inline-flex">
      {trigger}
      <span className={tooltipClass}>{content}</span>
    </span>
  );
}
