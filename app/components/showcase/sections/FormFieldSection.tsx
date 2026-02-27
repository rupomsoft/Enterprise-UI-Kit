"use client";

import { FormField, Input } from "@/app/components/ui";
import { Section } from "@/app/components/ui";

export function FormFieldSection() {
  return (
    <Section title="FormField" description="Label + children + hint/error.">
      <div className="w-56">
        <FormField label="Field" hint="Optional hint">
          <Input placeholder="Inside FormField" />
        </FormField>
      </div>
    </Section>
  );
}
