"use client";

import { DocPageLayout } from "@/app/components/common/DocPageLayout";
import { HowToUseSection } from "@/app/components/common/HowToUseSection";
import { SkeletonSection } from "@/app/components/showcase/sections/SkeletonSection";
import { Divider } from "@/app/components/ui";

const HOW_TO_USE_ENTRIES = [
  {
    label: "Import",
    code: `import { Skeleton, SkeletonBlock } from "@/app/components/ui";`,
    language: "tsx",
  },
  {
    label: "Basic usage",
    code: `<Skeleton className="h-4 w-full" />
<Skeleton className="h-4 w-3/4" />

<SkeletonBlock lines={3} />`,
    language: "tsx",
  },
];

export default function SkeletonPage() {
  return (
    <DocPageLayout>
      <SkeletonSection />
      <Divider />
      <HowToUseSection
        description="Use Skeleton for single-placeholder and SkeletonBlock for multi-line. Copy the examples below."
        entries={HOW_TO_USE_ENTRIES}
      />
    </DocPageLayout>
  );
}
