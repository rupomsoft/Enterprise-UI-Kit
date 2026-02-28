"use client";

import { cn } from "@/app/lib/utils";

export type BounceSpinnerSize = "sm" | "md" | "lg";

const dotSizeMap: Record<BounceSpinnerSize, string> = {
  sm: "h-1.5 w-1.5",
  md: "h-2.5 w-2.5",
  lg: "h-3.5 w-3.5",
};

const gapMap: Record<BounceSpinnerSize, string> = {
  sm: "gap-1",
  md: "gap-1.5",
  lg: "gap-2",
};

export interface BounceSpinnerProps {
  size?: BounceSpinnerSize;
  className?: string;
}

/** Bounce spinner — three circles bouncing vertically */
export function BounceSpinner({
  size = "md",
  className,
}: BounceSpinnerProps) {
  const dotSize = dotSizeMap[size];
  const gap = gapMap[size];

  return (
    <div
      className={cn("flex items-end shrink-0", gap, className)}
      role="status"
      aria-label="Loading"
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={cn(
            dotSize,
            "rounded-full bg-current animate-[bounce-dot_0.6s_ease-in-out_infinite_alternate]"
          )}
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}
