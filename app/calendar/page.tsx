"use client";

import { DocPageLayout } from "@/app/components/common/DocPageLayout";
import { HowToUseSection } from "@/app/components/common/HowToUseSection";
import { CalendarSection } from "@/app/components/showcase/sections/CalendarSection";
import { Divider } from "@/app/components/ui";

const HOW_TO_USE_ENTRIES = [
  { label: "Import", code: `import { Calendar } from "@/app/components/ui";`, language: "tsx" },
  {
    label: "Basic usage",
    code: `<Calendar
  value={date}
  onChange={setDate}
  triggerVariant="primary"
  triggerLabel="Pick date"
/>`,
    language: "tsx",
  },
  {
    label: "All variants",
    code: `// Primary
<Calendar value={date} onChange={setDate} triggerVariant="primary" triggerLabel="Pick date" />

// Secondary
<Calendar value={date} onChange={setDate} triggerVariant="secondary" triggerLabel="Pick date" />

// Danger
<Calendar value={date} onChange={setDate} triggerVariant="danger" triggerLabel="Pick date" />

// Primary outline
<Calendar value={date} onChange={setDate} triggerVariant="primary-outline" triggerLabel="Pick date" />

// Secondary outline
<Calendar value={date} onChange={setDate} triggerVariant="secondary-outline" triggerLabel="Pick date" />

// Danger outline
<Calendar value={date} onChange={setDate} triggerVariant="danger-outline" triggerLabel="Pick date" />`,
    language: "tsx",
    title: "Calendar trigger variants",
  },
];

export default function CalendarPage() {
  return (
    <DocPageLayout>
      <CalendarSection />
      <Divider />
      <HowToUseSection
        description="Import Calendar and control value/onChange. Use triggerVariant and triggerLabel for the trigger button."
        entries={HOW_TO_USE_ENTRIES}
      />
    </DocPageLayout>
  );
}
