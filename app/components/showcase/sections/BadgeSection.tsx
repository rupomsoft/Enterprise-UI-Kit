"use client";

import { Badge } from "@/app/components/ui";
import { Section } from "@/app/components/ui";

export function BadgeSection() {
  return (
    <Section title="Badge" description="Status and count badges. Filled and outline variants.">
      <div className="flex flex-wrap gap-2">
        <Badge>Default</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="error">Error</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="info">Info</Badge>
        <Badge variant="neutral" rounded="md">Neutral</Badge>
        <Badge variant="success-outline">Success outline</Badge>
        <Badge variant="error-outline">Error outline</Badge>
        <Badge variant="warning-outline">Warning outline</Badge>
        <Badge variant="info-outline">Info outline</Badge>
        <Badge variant="neutral-outline">Neutral outline</Badge>
      </div>
    </Section>
  );
}
