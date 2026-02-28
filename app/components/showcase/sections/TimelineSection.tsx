"use client";

import { CardTimeline, ClassicTimeline, HorizontalTimeline, Section } from "@/app/components/ui";
import type { CardTimelineItem } from "@/app/components/ui";
import type { HorizontalTimelineItem } from "@/app/components/ui";

const cardTimelineItems: CardTimelineItem[] = [
  {
    id: "1",
    title: "Kickoff",
    time: "09:00",
    description: "Project brief and team alignment",
    state: "completed",
  },
  {
    id: "2",
    title: "Research",
    time: "10:30",
    description: "User interviews and data analysis",
    state: "completed",
  },
  {
    id: "3",
    title: "Ideation",
    time: "12:00",
    description: "Brainstorming session with stakeholders",
    state: "active",
    statusLabel: "In progress",
  },
  {
    id: "4",
    title: "Prototype",
    time: "14:00",
    description: "Wireframes and interactive mockup",
    state: "pending",
  },
  {
    id: "5",
    title: "Review",
    time: "16:00",
    description: "Final presentation and feedback",
    state: "pending",
  },
];

const horizontalTimelineItems: HorizontalTimelineItem[] = [
  { id: "1", tag: "Start", title: "Kickoff", description: "Project brief and team alignment", time: "09:00" },
  { id: "2", tag: "Discovery", title: "Research", description: "User interviews and data analysis", time: "10:30" },
  { id: "3", tag: "Creative", title: "Ideation", description: "Brainstorming session with stakeholders", time: "12:00" },
  { id: "4", tag: "Build", title: "Prototype", description: "Wireframes and interactive mockup", time: "14:00" },
  { id: "5", tag: "Wrap-up", title: "Review", description: "Final presentation and feedback", time: "16:00" },
];

export function TimelineSection() {
  return (
    <Section title="Timeline" block>
      <div className="flex flex-col gap-10">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
            HorizontalTimeline (with arrow slides)
          </p>
          <div className="w-full max-w-2xl overflow-hidden">
            <HorizontalTimeline title="Timeline" items={horizontalTimelineItems} />
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
            ClassicTimeline
          </p>
          <div className="max-w-sm">
            <ClassicTimeline
              items={[
                { title: "First", desc: "First event", time: "10:00" },
                { title: "Second", desc: "Second event", time: "11:00" },
              ]}
            />
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
            CardTimeline
          </p>
          <div className="max-w-md">
            <CardTimeline items={cardTimelineItems} />
          </div>
        </div>
      </div>
    </Section>
  );
}
