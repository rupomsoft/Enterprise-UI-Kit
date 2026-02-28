"use client";

import { DocPageLayout } from "@/app/components/common/DocPageLayout";
import { HowToUseSection } from "@/app/components/common/HowToUseSection";
import { AccordionSection } from "@/app/components/showcase/sections/AccordionSection";
import { Divider } from "@/app/components/ui";

const HOW_TO_USE_ENTRIES = [
  {
    label: "Import",
    code: `import { Accordion, AccordionCard, AccordionFilled, AccordionNumbered } from "@/app/components/ui";
import type { AccordionItem, AccordionCardItem, AccordionFilledItem, AccordionNumberedItem } from "@/app/components/ui";`,
    language: "tsx",
  },
  {
    label: "Default accordion",
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
  {
    label: "Card-style accordion",
    code: `const items: AccordionCardItem[] = [
  { id: "1", title: "What is your refund policy?", content: "We offer a full refund within 30 days." },
  { id: "2", title: "How do I change my plan?", content: "Go to account settings." },
];

<AccordionCard
  items={items}
  openId={openId}
  onOpenChange={setOpenId}
/>`,
    language: "tsx",
  },
  {
    label: "Filled with Plus/Minus",
    code: `const items: AccordionFilledItem[] = [
  { id: "1", title: "What is your refund policy?", content: "We offer a full refund within 30 days." },
  { id: "2", title: "How do I change my plan?", content: "Go to account settings." },
];

<AccordionFilled
  items={items}
  openId={openId}
  onOpenChange={setOpenId}
/>`,
    language: "tsx",
  },
  {
    label: "Numbered accordion",
    code: `const items: AccordionNumberedItem[] = [
  { id: "1", title: "What is your refund policy?", content: "We offer a full refund within 30 days." },
  { id: "2", title: "How do I change my plan?", content: "Go to account settings." },
];

<AccordionNumbered
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
        description="Use Accordion (divided), AccordionCard (card), AccordionFilled (plus/minus), or AccordionNumbered (number badges). All use items, openId, and onOpenChange."
        entries={HOW_TO_USE_ENTRIES}
      />
    </DocPageLayout>
  );
}
