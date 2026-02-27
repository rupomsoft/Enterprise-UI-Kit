"use client";

import { Tooltip, Button } from "@/app/components/ui";
import { Section } from "@/app/components/ui";

export function TooltipSection() {
  return (
    <Section title="Tooltip">
      <Tooltip
        trigger={<Button variant="secondary">Hover me</Button>}
        content="Tooltip text"
      />
    </Section>
  );
}
