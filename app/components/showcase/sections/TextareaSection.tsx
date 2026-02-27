"use client";

import { Textarea } from "@/app/components/ui";
import { Section } from "@/app/components/ui";

export function TextareaSection() {
  return (
    <Section title="Textarea">
      <div className="w-64">
        <Textarea label="Message" placeholder="Enter text..." rows={3} />
      </div>
    </Section>
  );
}
