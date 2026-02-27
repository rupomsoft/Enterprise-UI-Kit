"use client";

import { useState } from "react";
import { ToggleButton } from "@/app/components/ui";
import { Section } from "@/app/components/ui";

export function ToggleButtonSection() {
  const [pressed, setPressed] = useState(false);
  return (
    <Section title="ToggleButton">
      <ToggleButton pressed={pressed} onPressedChange={setPressed} />
    </Section>
  );
}
