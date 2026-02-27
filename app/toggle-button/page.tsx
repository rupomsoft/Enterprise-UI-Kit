"use client";

import { DocPageLayout } from "@/app/components/common/DocPageLayout";
import { HowToUseSection } from "@/app/components/common/HowToUseSection";
import { ToggleButtonSection } from "@/app/components/showcase/sections/ToggleButtonSection";
import { Divider } from "@/app/components/ui";

const HOW_TO_USE_ENTRIES = [
  {
    label: "Import",
    code: `import { ToggleButton } from "@/app/components/ui";`,
    language: "tsx",
  },
  {
    label: "Basic usage",
    code: `<ToggleButton
  pressed={pressed}
  onPressedChange={setPressed}
/>`,
    language: "tsx",
  },
];

export default function ToggleButtonPage() {
  return (
    <DocPageLayout>
      <ToggleButtonSection />
      <Divider />
      <HowToUseSection
        description="Import ToggleButton. Pass pressed and onPressedChange. Copy the examples below."
        entries={HOW_TO_USE_ENTRIES}
      />
    </DocPageLayout>
  );
}
