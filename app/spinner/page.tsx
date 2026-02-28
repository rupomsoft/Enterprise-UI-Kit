"use client";

import { DocPageLayout } from "@/app/components/common/DocPageLayout";
import { HowToUseSection } from "@/app/components/common/HowToUseSection";
import { SpinnerSection } from "@/app/components/showcase/sections/SpinnerSection";
import { Divider } from "@/app/components/ui";

const HOW_TO_USE_ENTRIES = [
  {
    label: "Import",
    code: 'import { RingSpinner, SquareFlipSpinner, DuelRingSpinner, OrbitSpinner, BarSpinner, BounceSpinner, DotSpinner, RingFadeSpinner, ClockSpinner, RippleSpinner } from "@/app/components/ui";',
    language: "tsx",
  },
  {
    label: "RingSpinner",
    code: "<RingSpinner />\n<RingSpinner size=\"sm\" />\n<RingSpinner size=\"lg\" />",
    language: "tsx",
  },
  {
    label: "SquareFlipSpinner",
    code: "<SquareFlipSpinner />\n<SquareFlipSpinner size=\"sm\" />\n<SquareFlipSpinner size=\"lg\" />",
    language: "tsx",
  },
  {
    label: "DuelRingSpinner",
    code: "<DuelRingSpinner />\n<DuelRingSpinner size=\"sm\" />\n<DuelRingSpinner size=\"lg\" />",
    language: "tsx",
  },
  {
    label: "OrbitSpinner",
    code: "<OrbitSpinner />\n<OrbitSpinner size=\"sm\" />\n<OrbitSpinner size=\"lg\" />",
    language: "tsx",
  },
  {
    label: "BarSpinner",
    code: "<BarSpinner />\n<BarSpinner size=\"sm\" />\n<BarSpinner size=\"lg\" />",
    language: "tsx",
  },
  {
    label: "BounceSpinner",
    code: "<BounceSpinner />\n<BounceSpinner size=\"sm\" />\n<BounceSpinner size=\"lg\" />",
    language: "tsx",
  },
  {
    label: "DotSpinner",
    code: "<DotSpinner />\n<DotSpinner size=\"sm\" />\n<DotSpinner size=\"lg\" />",
    language: "tsx",
  },
  {
    label: "RingFadeSpinner",
    code: "<RingFadeSpinner />\n<RingFadeSpinner size=\"sm\" />\n<RingFadeSpinner size=\"lg\" />",
    language: "tsx",
  },
  {
    label: "ClockSpinner",
    code: "<ClockSpinner />\n<ClockSpinner size=\"sm\" />\n<ClockSpinner size=\"lg\" />",
    language: "tsx",
  },
  {
    label: "RippleSpinner",
    code: "<RippleSpinner />\n<RippleSpinner size=\"sm\" />\n<RippleSpinner size=\"lg\" />",
    language: "tsx",
  },
];

export default function SpinnerPage() {
  return (
    <DocPageLayout>
      <SpinnerSection />
      <Divider />
      <HowToUseSection
        description="Import any spinner for loading states. Sizes: sm, md, lg. Use currentColor so spinners inherit text color."
        entries={HOW_TO_USE_ENTRIES}
      />
    </DocPageLayout>
  );
}
