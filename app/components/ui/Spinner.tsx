"use client";

export type SpinnerSize = "sm" | "md" | "lg";

const sizeClass: Record<SpinnerSize, string> = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
};

export interface SpinnerProps {
  size?: SpinnerSize;
  className?: string;
}

export function Spinner({ size = "md", className = "" }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={`rounded-full border-2 border-gray-200 dark:border-gray-600 border-t-gray-900 dark:border-t-gray-100 animate-spin shrink-0 ${sizeClass[size]} ${className}`.trim()}
    />
  );
}
