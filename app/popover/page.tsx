"use client";

import { DocPageLayout } from "@/app/components/common/DocPageLayout";
import { HowToUseSection } from "@/app/components/common/HowToUseSection";
import { PopoverSection } from "@/app/components/showcase/sections/PopoverSection";
import { Divider } from "@/app/components/ui";

const HOW_TO_USE_ENTRIES = [
  {
    label: "Import",
    code: `import { Popover, Button } from "@/app/components/ui";`,
    language: "tsx",
  },
  {
    label: "Basic usage",
    code: `<Popover
  open={open}
  onOpenChange={setOpen}
  trigger={<Button variant="secondary">Popover</Button>}
>
  <p>Popover content.</p>
</Popover>`,
    language: "tsx",
  },
];

export default function PopoverPage() {
  return (
    <DocPageLayout>
      <PopoverSection />
      <Divider />
      <HowToUseSection
        description="Import Popover. Pass open, onOpenChange, trigger, and children as content. Copy the examples below."
        entries={HOW_TO_USE_ENTRIES}
      />
    </DocPageLayout>
  );
}
