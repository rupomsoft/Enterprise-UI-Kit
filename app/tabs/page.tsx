"use client";

import { DocPageLayout } from "@/app/components/common/DocPageLayout";
import { HowToUseSection } from "@/app/components/common/HowToUseSection";
import { TabsSection } from "@/app/components/showcase/sections/TabsSection";
import { Divider } from "@/app/components/ui";

const tabsBaseCode = `const tabs: TabItem[] = [
  { id: "one", label: "One", content: "Content 1." },
  { id: "two", label: "Two", content: "Content 2." },
  { id: "three", label: "Three", content: "Content 3." },
];`;

const underlineCode = `<Tabs
  tabs={tabs}
  activeId={activeId}
  onTabChange={setActiveId}
  variant="underline"
/>`;

const pillCode = `<Tabs
  tabs={tabs}
  activeId={activeId}
  onTabChange={setActiveId}
  variant="pill"
/>`;

const roundedCode = `<Tabs
  tabs={tabs}
  activeId={activeId}
  onTabChange={setActiveId}
  variant="rounded"
/>`;

const cardCode = `const tabsWithIcon: TabItem[] = [
  { id: "copilot", label: "Code Copilot", content: "Code Copilot content." },
  {
    id: "completions",
    label: "Tab Completions",
    content: "Tab completions content.",
    icon: <Sparkles />,
  },
  { id: "snippets", label: "Custom Snippets", content: "Custom snippets content." },
];

<Tabs
  tabs={tabsWithIcon}
  activeId={activeId}
  onTabChange={setActiveId}
  variant="card"
/>`;

const HOW_TO_USE_ENTRIES = [
  {
    label: "Import",
    code: `import { Tabs } from "@/app/components/ui";
import type { TabItem } from "@/app/components/ui";
import { Sparkles } from "lucide-react";`,
    language: "tsx",
  },
  { label: "Tab data (TabItem[])", code: tabsBaseCode, language: "tsx" },
  { label: "Underline", code: underlineCode, language: "tsx" },
  { label: "Pill", code: pillCode, language: "tsx" },
  { label: "Rounded", code: roundedCode, language: "tsx" },
  { label: "Card (with icon)", code: cardCode, language: "tsx" },
];

export default function TabsPage() {
  return (
    <DocPageLayout>
      <TabsSection />
      <Divider />
      <HowToUseSection
        description="Tabs with variant: underline, pill, rounded, card. TabItem: id, label, content, optional icon. Copy the examples below."
        entries={HOW_TO_USE_ENTRIES}
      />
    </DocPageLayout>
  );
}
