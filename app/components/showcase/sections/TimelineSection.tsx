"use client";

import { Timeline } from "@/app/components/ui";
import { Section } from "@/app/components/ui";

export function TimelineSection() {
  return (
    <Section title="Timeline" block>
      <div className="max-w-sm">
        <Timeline
          items={[
            { title: "First", desc: "First event", time: "10:00" },
            { title: "Second", desc: "Second event", time: "11:00" },
          ]}
        />
      </div>
    </Section>
  );
}
