"use client";

import { DocPageLayout } from "@/app/components/common/DocPageLayout";
import { HowToUseSection } from "@/app/components/common/HowToUseSection";
import { SkeletonSection } from "@/app/components/showcase/sections/SkeletonSection";
import { Divider } from "@/app/components/ui";

const HOW_TO_USE_ENTRIES = [
  {
    label: "Import",
    code: `import {
  Skeleton,
  SkeletonBlock,
  CircularSkeleton,
  TextSkeleton,
  CardSkeleton,
} from "@/app/components/ui";`,
    language: "tsx",
  },
  {
    label: "Skeleton",
    code: `<Skeleton className="h-4 w-full" />
<Skeleton className="h-4 w-3/4" />
<Skeleton className="h-4 w-1/2" />`,
    language: "tsx",
  },
  {
    label: "SkeletonBlock",
    code: `<SkeletonBlock lines={3} />`,
    language: "tsx",
  },
  {
    label: "CircularSkeleton",
    code: `<CircularSkeleton size="sm" />
<CircularSkeleton size="md" />
<CircularSkeleton size="lg" />`,
    language: "tsx",
  },
  {
    label: "TextSkeleton",
    code: `<TextSkeleton lines={4} />`,
    language: "tsx",
  },
  {
    label: "CardSkeleton",
    code: `<CardSkeleton />`,
    language: "tsx",
  },
];

export default function SkeletonPage() {
  return (
    <DocPageLayout>
      <SkeletonSection />
      <Divider />
      <HowToUseSection
        description="Use Skeleton (single bar), SkeletonBlock (lines + buttons), CircularSkeleton (round), TextSkeleton, or CardSkeleton for loading placeholders. Add className for size and shape."
        entries={HOW_TO_USE_ENTRIES}
      />
    </DocPageLayout>
  );
}
