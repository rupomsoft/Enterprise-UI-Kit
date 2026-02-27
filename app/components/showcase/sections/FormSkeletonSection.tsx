"use client";

import { FormSkeleton } from "@/app/components/ui";
import { Section } from "@/app/components/ui";

export function FormSkeletonSection() {
  return (
    <Section title="Form Skeleton" description="Loading placeholder for form." block>
      <FormSkeleton />
    </Section>
  );
}
