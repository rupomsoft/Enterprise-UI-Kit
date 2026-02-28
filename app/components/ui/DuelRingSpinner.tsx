"use client";

import { cn } from "@/app/lib/utils";

export type DuelRingSpinnerSize = "sm" | "md" | "lg";

const sizeMap: Record<DuelRingSpinnerSize, string> = {
  sm: "h-6 w-6",
  md: "h-10 w-10",
  lg: "h-14 w-14",
};

const strokeMap: Record<DuelRingSpinnerSize, number> = {
  sm: 3,
  md: 3,
  lg: 3,
};

const dimMap: Record<DuelRingSpinnerSize, number> = {
  sm: 24,
  md: 40,
  lg: 56,
};

export interface DuelRingSpinnerProps {
  size?: DuelRingSpinnerSize;
  className?: string;
}

/** Dual ring spinner — two counter-rotating rings */
export function DuelRingSpinner({
  size = "md",
  className,
}: DuelRingSpinnerProps) {
  const dim = dimMap[size];
  const stroke = strokeMap[size];
  const radius = (dim - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const innerRadius = radius * 0.6;
  const innerCircumference = 2 * Math.PI * innerRadius;

  return (
    <div
      className={cn("relative shrink-0", sizeMap[size], className)}
      role="status"
      aria-label="Loading"
    >
      <svg
        className="absolute inset-0 animate-spin"
        viewBox={`0 0 ${dim} ${dim}`}
        fill="none"
        style={{ animationDuration: "1.2s" }}
      >
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={stroke}
          className="opacity-10"
        />
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * 0.7}
        />
      </svg>
      <svg
        className="absolute inset-0 animate-spin"
        viewBox={`0 0 ${dim} ${dim}`}
        fill="none"
        style={{ animationDuration: "1.8s", animationDirection: "reverse" }}
      >
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={innerRadius}
          stroke="currentColor"
          strokeWidth={stroke * 0.75}
          strokeLinecap="round"
          strokeDasharray={innerCircumference}
          strokeDashoffset={innerCircumference * 0.7}
          className="opacity-50"
        />
      </svg>
    </div>
  );
}
