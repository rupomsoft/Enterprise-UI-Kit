"use client";

import { DocPageLayout } from "@/app/components/common/DocPageLayout";
import { HowToUseSection } from "@/app/components/common/HowToUseSection";
import { DropdownMenuSection } from "@/app/components/showcase/sections/DropdownMenuSection";
import { Divider } from "@/app/components/ui";

const HOW_TO_USE_ENTRIES = [
  {
    label: "Import",
    code: `import { DropdownMenu, Button } from "@/app/components/ui";`,
    language: "tsx",
  },
  {
    label: "Basic usage",
    code: `<DropdownMenu
  open={open}
  onOpenChange={setOpen}
  trigger={<Button variant="secondary">Menu</Button>}
  items={[
    { label: "Edit", onClick: () => {} },
    { label: "Delete", variant: "danger", onClick: () => {} },
  ]}
/>`,
    language: "tsx",
  },
];

export default function DropdownMenuPage() {
  return (
    <DocPageLayout>
      <DropdownMenuSection />
      <Divider />
      <HowToUseSection
        description="Import DropdownMenu. Pass open, onOpenChange, trigger, and items. Copy the examples below."
        entries={HOW_TO_USE_ENTRIES}
      />
    </DocPageLayout>
  );
}
