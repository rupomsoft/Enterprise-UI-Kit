"use client";

import { Tag } from "@/app/components/ui";
import { Section } from "@/app/components/ui";

export function TagSection() {
  return (
    <Section title="Tag">
      <Tag>Default</Tag>
      <Tag variant="filled">Filled</Tag>
      <Tag variant="success">Success</Tag>
      <Tag variant="warning">Filled</Tag>
      <Tag variant="error">Filled</Tag>
      <Tag variant="neutral">Filled</Tag>
    </Section>
  );
}
