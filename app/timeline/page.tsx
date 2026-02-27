"use client";

import { DocPageLayout } from "@/app/components/common/DocPageLayout";
import { HowToUseSection } from "@/app/components/common/HowToUseSection";
import { TimelineSection } from "@/app/components/showcase/sections/TimelineSection";
import { Divider } from "@/app/components/ui";

const HOW_TO_USE_ENTRIES = [
  { label: "Import", code: `import { Timeline } from "@/app/components/ui";`, language: "tsx" },
  {
    label: "Basic usage",
    code: `<Timeline
  items={[
    { title: "First", desc: "First event", time: "10:00" },
    { title: "Second", desc: "Second event", time: "11:00" },
  ]}
/>`,
    language: "tsx",
  },
];

export default function TimelinePage() {
  return (
    <DocPageLayout>
      <TimelineSection />
      <Divider />
      <HowToUseSection
        description="Import Timeline and pass an array of items with title, desc, and time. Copy the examples below."
        entries={HOW_TO_USE_ENTRIES}
      />
    </DocPageLayout>
  );
}
