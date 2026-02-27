"use client";

import { Skeleton, SkeletonBlock } from "@/app/components/ui";
import { Section } from "@/app/components/ui";

export function SkeletonSection() {
  return (
    <Section title="Skeleton & SkeletonBlock">
      <div className="w-48 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <div className="w-56">
        <SkeletonBlock lines={3} />
      </div>
    </Section>
  );
}
