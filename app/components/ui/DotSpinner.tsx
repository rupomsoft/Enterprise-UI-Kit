"use client";

import { cn } from "@/app/lib/utils";

export type DotSpinnerSize = "sm" | "md" | "lg";

const dotSizeMap: Record<DotSpinnerSize, string> = {
  sm: "h-1.5 w-1.5",
  md: "h-2.5 w-2.5",
  lg: "h-3.5 w-3.5",
};

const gapMap: Record<DotSpinnerSize, string> = {
  sm: "gap-1",
  md: "gap-1.5",
  lg: "gap-2",
};

export interface DotSpinnerProps {
  size?: DotSpinnerSize;
  className?: string;
}

/** Pulsing dots spinner — three dots scaling in sequence */
export function DotSpinner({
  size = "md",
  className,
}: DotSpinnerProps) {
  const dotSize = dotSizeMap[size];
  const gap = gapMap[size];

  return (
    <div
      className={cn("flex items-center shrink-0", gap, className)}
      role="status"
      aria-label="Loading"
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={cn(
            dotSize,
            "rounded-full bg-current animate-[pulse-dot_1.4s_ease-in-out_infinite]"
          )}
          style={{ animationDelay: `${i * 0.16}s` }}
        />
      ))}
    </div>
  );
}
