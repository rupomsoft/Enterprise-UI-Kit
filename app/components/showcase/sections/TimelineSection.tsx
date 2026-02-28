"use client";

import { CardTimeline, ClassicTimeline, Section } from "@/app/components/ui";
import type { CardTimelineItem } from "@/app/components/ui";

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

export function TimelineSection() {
  return (
    <Section title="Timeline" block>
      <div className="flex flex-col gap-10">
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
