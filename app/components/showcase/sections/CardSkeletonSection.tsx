"use client";

import { CardSkeleton } from "@/app/components/ui";
import { Section } from "@/app/components/ui";

export function CardSkeletonSection() {
  return (
    <Section title="Card Skeleton" description="Loading placeholder for card." block>
      <div className="max-w-3xl">
        <CardSkeleton />
      </div>
    </Section>
  );
}
