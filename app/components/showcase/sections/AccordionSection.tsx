"use client";

import { useState } from "react";
import { Accordion, AccordionCard, AccordionFilled, AccordionNumbered, Section } from "@/app/components/ui";
import type { AccordionItem } from "@/app/components/ui";
import type { AccordionCardItem } from "@/app/components/ui";
import type { AccordionFilledItem } from "@/app/components/ui";

const accordionItems: AccordionItem[] = [
  { id: "a1", title: "Accordion item 1", content: "Content for the first panel." },
  { id: "a2", title: "Accordion item 2", content: "Content for the second panel." },
];

const accordionCardItems: AccordionCardItem[] = [
  {
    id: "faq1",
    title: "What is your refund policy?",
    content:
      "We offer a full refund within 30 days of purchase. No questions asked. Simply contact our support team and we'll process your refund promptly.",
  },
  {
    id: "faq2",
    title: "How do I change my plan?",
    content:
      "You can upgrade or downgrade your plan anytime from the account settings page. Changes take effect at the start of your next billing cycle.",
  },
  {
    id: "faq3",
    title: "Can I cancel my subscription?",
    content:
      "Yes. You can cancel from your account settings. You'll keep access until the end of your current billing period.",
  },
];

export function AccordionSection() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [cardOpenId, setCardOpenId] = useState<string | null>(null);
  const [filledOpenId, setFilledOpenId] = useState<string | null>(null);
  const [numberedOpenId, setNumberedOpenId] = useState<string | null>(null);
  return (
    <Section title="Accordion" block>
      <div className="flex flex-col gap-10">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
            Default (divided)
          </p>
          <div className="max-w-md">
            <Accordion
              items={accordionItems}
              openId={openId}
              onOpenChange={setOpenId}
            />
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
            Card style
          </p>
          <div className="max-w-md">
            <AccordionCard
              items={accordionCardItems}
              openId={cardOpenId}
              onOpenChange={setCardOpenId}
            />
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
            Filled with Plus/Minus
          </p>
          <div className="max-w-md">
            <AccordionFilled
              items={accordionCardItems}
              openId={filledOpenId}
              onOpenChange={setFilledOpenId}
            />
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
            Numbered
          </p>
          <div className="max-w-md">
            <AccordionNumbered
              items={accordionCardItems}
              openId={numberedOpenId}
              onOpenChange={setNumberedOpenId}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
