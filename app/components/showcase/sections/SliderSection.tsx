"use client";

import { useState } from "react";
import { Slider } from "@/app/components/ui";
import { Section } from "@/app/components/ui";

export function SliderSection() {
  const [value, setValue] = useState(50);
  return (
    <Section title="Slider">
      <div className="w-48">
        <Slider value={value} onValueChange={setValue} min={0} max={100} />
        <span className="text-xs text-gray-500 dark:text-gray-400">{value}</span>
      </div>
    </Section>
  );
}
