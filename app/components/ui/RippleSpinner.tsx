"use client";

import { cn } from "@/app/lib/utils";

export type RippleSpinnerSize = "sm" | "md" | "lg";

const sizeMap: Record<RippleSpinnerSize, string> = {
  sm: "h-6 w-6",
  md: "h-10 w-10",
  lg: "h-14 w-14",
};

const strokeMap: Record<RippleSpinnerSize, number> = {
  sm: 3,
  md: 3,
  lg: 3,
};

const dimMap: Record<RippleSpinnerSize, number> = {
  sm: 24,
  md: 40,
  lg: 56,
};

export interface RippleSpinnerProps {
  size?: RippleSpinnerSize;
  className?: string;
}

/** Ripple spinner — concentric rings expanding outward */
export function RippleSpinner({
  size = "md",
  className,
}: RippleSpinnerProps) {
  const dim = dimMap[size];
  const stroke = strokeMap[size];
  const maxRadius = (dim - stroke) / 2;

  return (
    <div
      className={cn("relative shrink-0", sizeMap[size], className)}
      role="status"
      aria-label="Loading"
    >
      {[0, 1].map((i) => (
        <svg
          key={i}
          className="absolute inset-0"
          viewBox={`0 0 ${dim} ${dim}`}
          fill="none"
        >
          <circle
            cx={dim / 2}
            cy={dim / 2}
            r={maxRadius}
            stroke="currentColor"
            strokeWidth={stroke}
            style={{
              transformOrigin: "center",
              animation: `ripple-expand 1.6s cubic-bezier(0, 0.2, 0.8, 1) ${i * 0.8}s infinite`,
            }}
          />
        </svg>
      ))}
    </div>
  );
}
