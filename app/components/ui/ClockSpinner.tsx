"use client";

import { cn } from "@/app/lib/utils";

export type ClockSpinnerSize = "sm" | "md" | "lg";

const sizeMap: Record<ClockSpinnerSize, string> = {
  sm: "h-6 w-6",
  md: "h-10 w-10",
  lg: "h-14 w-14",
};

const strokeMap: Record<ClockSpinnerSize, number> = {
  sm: 3,
  md: 3,
  lg: 3,
};

const dimMap: Record<ClockSpinnerSize, number> = {
  sm: 24,
  md: 40,
  lg: 56,
};

export interface ClockSpinnerProps {
  size?: ClockSpinnerSize;
  className?: string;
}

/** Clock spinner — a rotating hand inside a ring */
export function ClockSpinner({
  size = "md",
  className,
}: ClockSpinnerProps) {
  const dim = dimMap[size];
  const stroke = strokeMap[size];
  const radius = (dim - stroke) / 2;
  const handLength = radius * 0.65;
  const cx = dim / 2;
  const cy = dim / 2;

  return (
    <svg
      className={cn(sizeMap[size], "shrink-0", className)}
      viewBox={`0 0 ${dim} ${dim}`}
      fill="none"
      role="status"
      aria-label="Loading"
    >
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        stroke="currentColor"
        strokeWidth={stroke}
        className="opacity-15"
      />
      <circle cx={cx} cy={cy} r={stroke * 0.5} fill="currentColor" />
      <line
        x1={cx}
        y1={cy}
        x2={cx}
        y2={cy - handLength}
        stroke="currentColor"
        strokeWidth={stroke}
        strokeLinecap="round"
        style={{
          transformOrigin: `${cx}px ${cy}px`,
          animation: "clock-hand 1.5s steps(12, end) infinite",
        }}
      />
    </svg>
  );
}
