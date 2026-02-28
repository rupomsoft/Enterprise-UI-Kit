"use client";

import {
  CardSkeleton,
  CircularSkeleton,
  Section,
  Skeleton,
  SkeletonBlock,
  TextSkeleton,
} from "@/app/components/ui";

export function SkeletonSection() {
  return (
    <Section title="Skeleton" block>
      <div className="flex flex-col gap-10">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
            Skeleton
          </p>
          <div className="w-48 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
            SkeletonBlock
          </p>
          <div className="w-56">
            <SkeletonBlock lines={3} />
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
            CircularSkeleton
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <CircularSkeleton size="sm" />
              <span className="text-xs text-gray-500 dark:text-gray-400">sm</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <CircularSkeleton size="md" />
              <span className="text-xs text-gray-500 dark:text-gray-400">md</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <CircularSkeleton size="lg" />
              <span className="text-xs text-gray-500 dark:text-gray-400">lg</span>
            </div>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
            TextSkeleton
          </p>
          <div className="max-w-sm">
            <TextSkeleton lines={4} />
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
            CardSkeleton
          </p>
          <div className="max-w-xs">
            <CardSkeleton />
          </div>
        </div>
      </div>
    </Section>
  );
}
