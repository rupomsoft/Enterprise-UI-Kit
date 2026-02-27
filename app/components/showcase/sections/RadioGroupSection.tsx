"use client";

import { useState } from "react";
import { RadioGroup } from "@/app/components/ui";
import { Section } from "@/app/components/ui";

export function RadioGroupSection() {
  const [value, setValue] = useState("opt1");
  return (
    <Section title="Radio Group" description="Radio with label and optional hint.">
      <RadioGroup
        name="radiogroup"
        label="Choose one"
        options={[
          { value: "opt1", label: "Option 1" },
          { value: "opt2", label: "Option 2" },
        ]}
        value={value}
        onChange={setValue}
        hint="Optional hint"
      />
    </Section>
  );
}
