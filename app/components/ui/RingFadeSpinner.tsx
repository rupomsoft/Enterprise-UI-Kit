"use client";

import { cn } from "@/app/lib/utils";

export type RingFadeSpinnerSize = "sm" | "md" | "lg";

const sizeMap: Record<RingFadeSpinnerSize, string> = {
  sm: "h-6 w-6",
  md: "h-10 w-10",
  lg: "h-14 w-14",
};

const strokeMap: Record<RingFadeSpinnerSize, number> = {
  sm: 3,
  md: 3,
  lg: 3,
};

const dimMap: Record<RingFadeSpinnerSize, number> = {
  sm: 24,
  md: 40,
  lg: 56,
};

export interface RingFadeSpinnerProps {
  size?: RingFadeSpinnerSize;
  className?: string;
}

/** Ring fade spinner — segmented ring with segments fading in sequence */
export function RingFadeSpinner({
  size = "md",
  className,
}: RingFadeSpinnerProps) {
  const dim = dimMap[size];
  const stroke = strokeMap[size];
  const radius = (dim - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const segments = 8;
  const segmentLength = circumference / segments;
  const gapLength = segmentLength * 0.3;
  const dashLength = segmentLength - gapLength;

  return (
    <div
      className={cn("relative shrink-0", sizeMap[size], className)}
      role="status"
      aria-label="Loading"
    >
      {Array.from({ length: segments }).map((_, i) => (
        <svg
          key={i}
          className="absolute inset-0"
          viewBox={`0 0 ${dim} ${dim}`}
          fill="none"
          style={{
            transform: `rotate(${(360 / segments) * i}deg)`,
            animation: `segment-fade 1s ease-in-out ${(i / segments) * 1}s infinite`,
          }}
        >
          <circle
            cx={dim / 2}
            cy={dim / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${dashLength} ${circumference - dashLength}`}
            strokeDashoffset={0}
          />
        </svg>
      ))}
    </div>
  );
}
