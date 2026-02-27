"use client";

import { TextSkeleton } from "@/app/components/ui";
import { Section } from "@/app/components/ui";

export function TextSkeletonSection() {
  return (
    <Section title="Text Skeleton" description="Loading placeholder for text lines." block>
      <div className="max-w-3xl">
        <TextSkeleton lines={4} />
      </div>
    </Section>
  );
}
