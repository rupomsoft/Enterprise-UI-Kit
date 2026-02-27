"use client";

import { Typography } from "@/app/components/ui";
import { Section } from "@/app/components/ui";

export function TypographySection() {
  return (
    <Section title="Typography" description="Text variants: h1–h4, body1, body2, caption, label." block>
      <div className="space-y-2">
        <Typography variant="h1">Heading 1</Typography>
        <Typography variant="h2">Heading 2</Typography>
        <Typography variant="body1">Body text.</Typography>
        <Typography variant="caption">Caption text.</Typography>
      </div>
    </Section>
  );
}
