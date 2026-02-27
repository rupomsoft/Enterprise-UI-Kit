"use client";

import { useState } from "react";
import { Radio } from "@/app/components/ui";
import { Section } from "@/app/components/ui";

export function RadioSection() {
  const [value, setValue] = useState("a");
  return (
    <Section title="Radio">
      <Radio
        name="demo"
        options={[
          { value: "a", label: "Option A" },
          { value: "b", label: "Option B" },
        ]}
        value={value}
        onChange={setValue}
      />
    </Section>
  );
}
