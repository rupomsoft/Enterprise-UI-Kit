"use client";

import { DocPageLayout } from "@/app/components/common/DocPageLayout";
import { HowToUseSection } from "@/app/components/common/HowToUseSection";
import { ContextMenuSection } from "@/app/components/showcase/sections/ContextMenuSection";
import { Divider } from "@/app/components/ui";

const HOW_TO_USE_ENTRIES = [
  {
    label: "Import",
    code: `import { ContextMenu, Card } from "@/app/components/ui";`,
    language: "tsx",
  },
  {
    label: "Basic usage",
    code: `<ContextMenu
  items={[
    { label: "Copy", onClick: () => {} },
    { label: "Rename", onClick: () => {} },
    { label: "Delete", variant: "danger", onClick: () => {} },
  ]}
>
  <Card className="cursor-context-menu">Right-click this card</Card>
</ContextMenu>`,
    language: "tsx",
  },
];

export default function ContextMenuPage() {
  return (
    <DocPageLayout>
      <ContextMenuSection />
      <Divider />
      <HowToUseSection
        description="Wrap content with ContextMenu and pass items. Right-click to open. Copy the examples below."
        entries={HOW_TO_USE_ENTRIES}
      />
    </DocPageLayout>
  );
}
