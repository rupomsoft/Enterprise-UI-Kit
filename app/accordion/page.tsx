"use client";

import { DocPageLayout } from "@/app/components/common/DocPageLayout";
import { HowToUseSection } from "@/app/components/common/HowToUseSection";
import { AccordionSection } from "@/app/components/showcase/sections/AccordionSection";
import { Divider } from "@/app/components/ui";

const HOW_TO_USE_ENTRIES = [
  {
    label: "Import",
    code: `import { Accordion } from "@/app/components/ui";
import type { AccordionItem } from "@/app/components/ui";`,
    language: "tsx",
  },
  {
    label: "Basic usage",
    code: `const items: AccordionItem[] = [
  { id: "a1", title: "Item 1", content: "Content for the first panel." },
  { id: "a2", title: "Item 2", content: "Content for the second panel." },
];

<Accordion
  items={items}
  openId={openId}
  onOpenChange={setOpenId}
/>`,
    language: "tsx",
  },
];

export default function AccordionPage() {
  return (
    <DocPageLayout>
      <AccordionSection />
      <Divider />
      <HowToUseSection
        description="Import Accordion and AccordionItem type. Pass items, openId, and onOpenChange. Copy the examples below."
        entries={HOW_TO_USE_ENTRIES}
      />
    </DocPageLayout>
  );
}
