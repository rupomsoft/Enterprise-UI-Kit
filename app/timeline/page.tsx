"use client";

import { DocPageLayout } from "@/app/components/common/DocPageLayout";
import { HowToUseSection } from "@/app/components/common/HowToUseSection";
import { TimelineSection } from "@/app/components/showcase/sections/TimelineSection";
import { Divider } from "@/app/components/ui";

const HOW_TO_USE_ENTRIES = [
  {
    label: "Import",
    code: `import { ClassicTimeline, CardTimeline, HorizontalTimeline } from "@/app/components/ui";
import type { ClassicTimelineItem, CardTimelineItem, HorizontalTimelineItem } from "@/app/components/ui";`,
    language: "tsx",
  },
  {
    label: "HorizontalTimeline",
    code: `const items: HorizontalTimelineItem[] = [
  { id: "1", tag: "Start", title: "Kickoff", description: "Project brief.", time: "09:00" },
  { id: "2", tag: "Build", title: "Prototype", description: "Wireframes.", time: "14:00" },
];

<HorizontalTimeline title="Timeline" items={items} />`,
    language: "tsx",
  },
  {
    label: "ClassicTimeline",
    code: `<ClassicTimeline
  items={[
    { title: "First", desc: "First event", time: "10:00" },
    { title: "Second", desc: "Second event", time: "11:00" },
  ]}
/>`,
    language: "tsx",
  },
  {
    label: "CardTimeline",
    code: `const items: CardTimelineItem[] = [
  { id: "1", title: "Kickoff", time: "09:00", description: "Project brief.", state: "completed" },
  { id: "2", title: "Ideation", time: "12:00", description: "Brainstorming.", state: "active", statusLabel: "In progress" },
  { id: "3", title: "Review", time: "16:00", description: "Final feedback.", state: "pending" },
];

<CardTimeline items={items} />`,
    language: "tsx",
  },
];

export default function TimelinePage() {
  return (
    <DocPageLayout>
      <TimelineSection />
      <Divider />
      <HowToUseSection
        description="Use HorizontalTimeline (horizontal + arrow slides), ClassicTimeline (vertical list), or CardTimeline (cards with states). HorizontalTimeline items support tag, title, description, time."
        entries={HOW_TO_USE_ENTRIES}
      />
    </DocPageLayout>
  );
}
