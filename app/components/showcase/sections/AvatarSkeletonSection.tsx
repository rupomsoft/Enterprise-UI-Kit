"use client";

import { AvatarSkeleton } from "@/app/components/ui";
import { Section } from "@/app/components/ui";

export function AvatarSkeletonSection() {
  return (
    <Section title="Avatar Skeleton" description="Loading placeholder for avatar.">
      <AvatarSkeleton size="sm" />
      <AvatarSkeleton size="md" />
      <AvatarSkeleton size="lg" />
    </Section>
  );
}
