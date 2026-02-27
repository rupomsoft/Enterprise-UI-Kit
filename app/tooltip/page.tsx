"use client";

import { DocPageLayout } from "@/app/components/common/DocPageLayout";
import { HowToUseSection } from "@/app/components/common/HowToUseSection";
import { TooltipSection } from "@/app/components/showcase/sections/TooltipSection";
import { Divider } from "@/app/components/ui";

const HOW_TO_USE_ENTRIES = [
  {
    label: "Import",
    code: `import { Tooltip, Button } from "@/app/components/ui";`,
    language: "tsx",
  },
  {
    label: "Basic usage",
    code: `<Tooltip
  trigger={<Button variant="secondary">Hover me</Button>}
  content="Tooltip text"
/>`,
    language: "tsx",
  },
];

export default function TooltipPage() {
  return (
    <DocPageLayout>
      <TooltipSection />
      <Divider />
      <HowToUseSection
        description="Import Tooltip. Pass trigger and content. Copy the examples below."
        entries={HOW_TO_USE_ENTRIES}
      />
    </DocPageLayout>
  );
}
