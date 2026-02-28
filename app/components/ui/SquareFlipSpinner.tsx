"use client";

import { cn } from "@/app/lib/utils";

export type SquareFlipSpinnerSize = "sm" | "md" | "lg";

const sizeMap: Record<SquareFlipSpinnerSize, string> = {
  sm: "h-6 w-6",
  md: "h-10 w-10",
  lg: "h-14 w-14",
};

export interface SquareFlipSpinnerProps {
  size?: SquareFlipSpinnerSize;
  className?: string;
}

/** Square flip spinner — a square flipping along its axis */
export function SquareFlipSpinner({
  size = "md",
  className,
}: SquareFlipSpinnerProps) {
  const dim = sizeMap[size];

  return (
    <div
      className={cn(
        dim,
        "shrink-0 animate-[square-flip_1.2s_ease-in-out_infinite] rounded-sm bg-current",
        className
      )}
      role="status"
      aria-label="Loading"
      style={{ perspective: "120px" }}
    />
  );
}
