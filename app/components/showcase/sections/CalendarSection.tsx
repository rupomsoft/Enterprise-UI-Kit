"use client";

import { useState } from "react";
import { Calendar } from "@/app/components/ui";
import type { ButtonVariant } from "@/app/components/ui";
import { Section } from "@/app/components/ui";

const TRIGGER_VARIANTS: ButtonVariant[] = [
  "primary",
  "secondary",
  "danger",
  "primary-outline",
  "secondary-outline",
  "danger-outline",
];

export function CalendarSection() {
  const [dates, setDates] = useState<Record<string, Date | null>>({});
  return (
    <Section title="Calendar" description="Pick date button with variants like Button (primary, secondary, danger, outline).">
      <div className="flex flex-wrap gap-3">
        {TRIGGER_VARIANTS.map((variant) => (
          <Calendar
            key={variant}
            value={dates[variant] ?? null}
            onChange={(d) => setDates((prev) => ({ ...prev, [variant]: d }))}
            triggerVariant={variant}
            triggerLabel="Pick date"
          />
        ))}
      </div>
    </Section>
  );
}
