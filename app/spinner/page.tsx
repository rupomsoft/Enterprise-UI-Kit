"use client";

import { DocPageLayout } from "@/app/components/common/DocPageLayout";
import { HowToUseSection } from "@/app/components/common/HowToUseSection";
import { SpinnerSection } from "@/app/components/showcase/sections/SpinnerSection";
import { Divider } from "@/app/components/ui";

const HOW_TO_USE_ENTRIES = [
  {
    label: "Import",
    code: 'import { Spinner } from "@/app/components/ui";',
    language: "tsx",
  },
  {
    label: "Basic usage",
    code: "<Spinner />",
    language: "tsx",
  },
];

export default function SpinnerPage() {
  return (
    <DocPageLayout>
      <SpinnerSection />
      <Divider />
      <HowToUseSection
        description="Import Spinner for loading states. Copy the example below."
        entries={HOW_TO_USE_ENTRIES}
      />
    </DocPageLayout>
  );
}
