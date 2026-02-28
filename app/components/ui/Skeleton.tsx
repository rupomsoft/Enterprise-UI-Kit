"use client";

import { type ReactNode } from "react";

export interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`rounded bg-gray-200 dark:bg-gray-600 animate-pulse ${className}`.trim()}
      aria-hidden
    />
  );
}

export function SkeletonBlock({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton
          key={i}
          className={`h-4 ${i === 0 ? "w-3/4" : i === 1 ? "w-1/2" : "w-5/6"}`}
        />
      ))}
      <div className="flex gap-3 pt-2">
        <Skeleton className="h-9 w-20 rounded-[8px]" />
        <Skeleton className="h-9 w-20 rounded-[8px]" />
      </div>
    </div>
  );
}

const sizeClass = { sm: "w-8 h-8", md: "w-10 h-10", lg: "w-12 h-12" };

export interface CircularSkeletonProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

/** Circular (round) skeleton placeholder. Use for avatars, icons, or any circular loading state. */
export function CircularSkeleton({ size = "md", className = "" }: CircularSkeletonProps) {
  return (
    <Skeleton
      className={`rounded-full shrink-0 ${sizeClass[size]} ${className}`.trim()}
    />
  );
}

export function AvatarSkeleton({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  return (
    <Skeleton className={`rounded-full shrink-0 ${sizeClass[size]}`} />
  );
}

export function CardSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-[10px] border border-gray-200 dark:border-gray-600 p-4 space-y-3 ${className}`.trim()}>
      <Skeleton className="h-5 w-1/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-4/6" />
    </div>
  );
}

export function TextSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton key={i} className={`h-4 ${i === lines - 1 && lines > 1 ? "w-2/3" : "w-full"}`} />
      ))}
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="space-y-4 max-w-sm">
      <div>
        <Skeleton className="h-4 w-16 mb-2" />
        <Skeleton className="h-10 w-full rounded-[8px]" />
      </div>
      <div>
        <Skeleton className="h-4 w-20 mb-2" />
        <Skeleton className="h-10 w-full rounded-[8px]" />
      </div>
      <div>
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-24 w-full rounded-[8px]" />
      </div>
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-10 w-24 rounded-[8px]" />
        <Skeleton className="h-10 w-24 rounded-[8px]" />
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 4, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="rounded-[8px] border border-gray-200 dark:border-gray-600 overflow-hidden">
      <div className="flex gap-4 px-4 py-3 border-b border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50">
        {Array.from({ length: cols }, (_, i) => (
          <Skeleton key={i} className="h-4 flex-1 min-w-0" />
        ))}
      </div>
      {Array.from({ length: rows }, (_, r) => (
        <div
          key={r}
          className="flex gap-4 px-4 py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
        >
          {Array.from({ length: cols }, (_, c) => (
            <Skeleton key={c} className="h-4 flex-1 min-w-0" />
          ))}
        </div>
      ))}
    </div>
  );
}
