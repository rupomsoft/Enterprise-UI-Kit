"use client";

import { Card } from "./Card";
import { ProgressBar } from "./ProgressBar";
import type { ProgressBarVariant } from "./ProgressBar";

export interface ProgressCardProps {
  /** Card title (e.g. Project progress) */
  title: string;
  /** Progress value 0–100 */
  value: number;
  /** Optional label (e.g. "70%" or "7 of 10 tasks"); defaults to value + "%" */
  label?: string;
  /** Bar color variant */
  variant?: ProgressBarVariant;
  className?: string;
}

export function ProgressCard({
  title,
  value,
  label,
  variant = "default",
  className = "",
}: ProgressCardProps) {
  const displayLabel = label ?? `${value}%`;
  return (
    <Card className={className}>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{title}</p>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400 tabular-nums shrink-0">
            {displayLabel}
          </span>
        </div>
        <ProgressBar value={value} variant={variant} showValue={false} />
      </div>
    </Card>
  );
}
