"use client";

import { Button } from "@/app/components/ui";
import { Section } from "@/app/components/ui";

export function ButtonSection() {
  return (
    <Section title="Button" description="Primary, secondary, danger and outline variants.">
      <div className="flex flex-wrap gap-3">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="primary-outline">Primary outline</Button>
        <Button variant="secondary-outline">Secondary outline</Button>
        <Button variant="danger-outline">Danger outline</Button>
      </div>
    </Section>
  );
}
