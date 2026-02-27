"use client";

import { useState } from "react";
import { Section, Tabs } from "@/app/components/ui";
import type { TabItem } from "@/app/components/ui";
import { Sparkles } from "lucide-react";

const tabsMail: TabItem[] = [
  { id: "inbox", label: "Inbox", content: "Inbox content." },
  { id: "snoozed", label: "Snoozed", content: "Snoozed content." },
  { id: "sent", label: "Sent", content: "Sent content." },
  { id: "all", label: "All Mail", content: "All mail content." },
  { id: "trash", label: "Trash", content: "Trash content." },
];

const tabsCard: TabItem[] = [
  { id: "copilot", label: "Code Copilot", content: "Code Copilot content." },
  {
    id: "completions",
    label: "Tab Completions",
    content: "Tab completions content.",
    icon: <Sparkles />,
  },
  {
    id: "snippets",
    label: "Custom Snippets",
    content: "Custom snippets content.",
  },
];

export function TabsSection() {
  const [underlineId, setUnderlineId] = useState("snoozed");
  const [pillId, setPillId] = useState("snoozed");
  const [cardId, setCardId] = useState("completions");
  const [roundedId, setRoundedId] = useState("snoozed");

  return (
    <Section title="Tabs" block>
      <div className="space-y-8 max-w-2xl">
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Underline
          </h3>
          <Tabs
            tabs={tabsMail}
            activeId={underlineId}
            onTabChange={setUnderlineId}
            variant="underline"
          />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Pill
          </h3>
          <Tabs
            tabs={tabsMail}
            activeId={pillId}
            onTabChange={setPillId}
            variant="pill"
          />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Card (with icon)
          </h3>
          <Tabs
            tabs={tabsCard}
            activeId={cardId}
            onTabChange={setCardId}
            variant="card"
          />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Rounded
          </h3>
          <Tabs
            tabs={tabsMail}
            activeId={roundedId}
            onTabChange={setRoundedId}
            variant="rounded"
          />
        </div>
      </div>
    </Section>
  );
}
