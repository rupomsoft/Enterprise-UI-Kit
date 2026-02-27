"use client";

import { DocPageLayout } from "@/app/components/common/DocPageLayout";
import { HowToUseSection } from "@/app/components/common/HowToUseSection";
import { ProgressSection } from "@/app/components/showcase/sections/ProgressSection";
import { Divider } from "@/app/components/ui";

const HOW_TO_USE_ENTRIES = [
  {
    label: "Import",
    code: `import { ProgressBar, ProgressRing, ProgressCard } from "@/app/components/ui";`,
    language: "tsx",
  },
  {
    label: "Basic usage",
    code: `<ProgressBar value={60} label="Default" />
<ProgressBar value={80} variant="success" />

<ProgressRing value={75} />
<ProgressRing value={40} variant="success" size={48} />`,
    language: "tsx",
  },
];

export default function ProgressBarPage() {
  return (
    <DocPageLayout>
      <ProgressSection />
      <Divider />
      <HowToUseSection
        description="Use ProgressBar, ProgressRing, or ProgressCard. Copy the examples below."
        entries={HOW_TO_USE_ENTRIES}
      />
    </DocPageLayout>
  );
}
