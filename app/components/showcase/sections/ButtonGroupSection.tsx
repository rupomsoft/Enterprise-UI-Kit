"use client";

import { useState } from "react";
import { ButtonGroup } from "@/app/components/ui";
import type { ButtonVariant } from "@/app/components/ui";
import { Section } from "@/app/components/ui";

const OPTIONS = [
  { value: "left", label: "Left" },
  { value: "center", label: "Center" },
  { value: "right", label: "Right" },
];

const VARIANTS: ButtonVariant[] = [
  "primary",
  "secondary",
  "danger",
  "primary-outline",
  "secondary-outline",
  "danger-outline",
];

export function ButtonGroupSection() {
  const [buttonGroupVal, setButtonGroupVal] = useState("left");
  const [localValues, setLocalValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(VARIANTS.map((v) => [v, "center"]))
  );

  return (
    <Section title="Button Group" description="Segmented button group with primary, secondary, danger and outline variants.">
      <div className="flex flex-wrap gap-6">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Secondary</p>
          <ButtonGroup options={OPTIONS} value={buttonGroupVal} onChange={setButtonGroupVal} variant="secondary" />
        </div>
        {VARIANTS.map((variant) => (
          <div key={variant}>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 capitalize">{variant.replace("-", " ")}</p>
            <ButtonGroup
              options={OPTIONS}
              value={localValues[variant]}
              onChange={(v) => setLocalValues((prev) => ({ ...prev, [variant]: v }))}
              variant={variant}
            />
          </div>
        ))}
      </div>
    </Section>
  );
}
