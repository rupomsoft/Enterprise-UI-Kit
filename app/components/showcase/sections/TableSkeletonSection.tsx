"use client";

import { TableSkeleton } from "@/app/components/ui";
import { Section } from "@/app/components/ui";

export function TableSkeletonSection() {
  return (
    <Section title="Table Skeleton" description="Loading placeholder for table." block>
      <div className="max-w-3xl">
        <TableSkeleton rows={3} cols={4} />
      </div>
    </Section>
  );
}
