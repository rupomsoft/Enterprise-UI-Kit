"use client";

import { cn } from "@/app/lib/utils";

export type BarSpinnerSize = "sm" | "md" | "lg";

const barHeightMap: Record<BarSpinnerSize, string> = {
  sm: "h-4",
  md: "h-6",
  lg: "h-8",
};

const barWidthMap: Record<BarSpinnerSize, string> = {
  sm: "w-0.5",
  md: "w-1",
  lg: "w-1.5",
};

const gapMap: Record<BarSpinnerSize, string> = {
  sm: "gap-0.5",
  md: "gap-1",
  lg: "gap-1.5",
};

export interface BarSpinnerProps {
  size?: BarSpinnerSize;
  className?: string;
}

/** Bar spinner — five bars scaling in a wave */
export function BarSpinner({
  size = "md",
  className,
}: BarSpinnerProps) {
  const barHeight = barHeightMap[size];
  const barWidth = barWidthMap[size];
  const gap = gapMap[size];

  return (
    <div
      className={cn(
        "flex items-center shrink-0 [&>span]:origin-bottom",
        gap,
        className
      )}
      role="status"
      aria-label="Loading"
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className={cn(
            barWidth,
            barHeight,
            "rounded-full bg-current animate-[bar-scale_1.2s_ease-in-out_infinite]"
          )}
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  );
}
