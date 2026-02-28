"use client";

import { cn } from "@/app/lib/utils";

export type RingSpinnerSize = "sm" | "md" | "lg";

const sizeMap: Record<RingSpinnerSize, string> = {
  sm: "h-6 w-6",
  md: "h-10 w-10",
  lg: "h-14 w-14",
};

const strokeMap: Record<RingSpinnerSize, number> = {
  sm: 3,
  md: 3,
  lg: 3,
};

const dimMap: Record<RingSpinnerSize, number> = {
  sm: 24,
  md: 40,
  lg: 56,
};

export interface RingSpinnerProps {
  size?: RingSpinnerSize;
  className?: string;
}

/** Classic ring spinner — a single arc rotating around a track circle */
export function RingSpinner({ size = "md", className }: RingSpinnerProps) {
  const dim = dimMap[size];
  const stroke = strokeMap[size];
  const radius = (dim - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <svg
      className={cn(sizeMap[size], "animate-spin shrink-0", className)}
      viewBox={`0 0 ${dim} ${dim}`}
      fill="none"
      aria-label="Loading"
      role="status"
    >
      <circle
        cx={dim / 2}
        cy={dim / 2}
        r={radius}
        stroke="currentColor"
        strokeWidth={stroke}
        className="opacity-15"
      />
      <circle
        cx={dim / 2}
        cy={dim / 2}
        r={radius}
        stroke="currentColor"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference * 0.75}
      />
    </svg>
  );
}
