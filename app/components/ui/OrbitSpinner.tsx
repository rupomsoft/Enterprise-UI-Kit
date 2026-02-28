"use client";

import { cn } from "@/app/lib/utils";

export type OrbitSpinnerSize = "sm" | "md" | "lg";

const sizeMap: Record<OrbitSpinnerSize, string> = {
  sm: "h-6 w-6",
  md: "h-10 w-10",
  lg: "h-14 w-14",
};

const strokeMap: Record<OrbitSpinnerSize, number> = {
  sm: 3,
  md: 3,
  lg: 3,
};

const dimMap: Record<OrbitSpinnerSize, number> = {
  sm: 24,
  md: 40,
  lg: 56,
};

export interface OrbitSpinnerProps {
  size?: OrbitSpinnerSize;
  className?: string;
}

/** Orbit spinner — a dot orbiting a faded ring */
export function OrbitSpinner({
  size = "md",
  className,
}: OrbitSpinnerProps) {
  const dim = dimMap[size];
  const stroke = strokeMap[size];
  const radius = (dim - stroke) / 2;
  const dotRadius = stroke * 0.9;

  return (
    <div
      className={cn("relative shrink-0", sizeMap[size], className)}
      role="status"
      aria-label="Loading"
    >
      <svg
        className="absolute inset-0"
        viewBox={`0 0 ${dim} ${dim}`}
        fill="none"
      >
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={stroke * 0.5}
          className="opacity-10"
        />
      </svg>
      <svg
        className="absolute inset-0 animate-spin"
        viewBox={`0 0 ${dim} ${dim}`}
        fill="none"
        style={{ animationDuration: "1.5s", animationTimingFunction: "linear" }}
      >
        <circle
          cx={dim / 2}
          cy={stroke / 2}
          r={dotRadius}
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
