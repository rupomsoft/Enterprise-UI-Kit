"use client";

import { useState } from "react";
import { Accordion } from "@/app/components/ui";
import type { AccordionItem } from "@/app/components/ui";
import { Section } from "@/app/components/ui";

const accordionItems: AccordionItem[] = [
  { id: "a1", title: "Accordion item 1", content: "Content for the first panel." },
  { id: "a2", title: "Accordion item 2", content: "Content for the second panel." },
];

export function AccordionSection() {
  const [openId, setOpenId] = useState<string | null>(null);
  return (
    <Section title="Accordion" block>
      <div className="max-w-md">
        <Accordion
          items={accordionItems}
          openId={openId}
          onOpenChange={setOpenId}
        />
      </div>
    </Section>
  );
}
