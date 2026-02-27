"use client";

import { useState } from "react";
import { Checkbox, Switch } from "@/app/components/ui";
import { Section } from "@/app/components/ui";

export function CheckboxSwitchSection() {
  const [switchOn, setSwitchOn] = useState(false);
  return (
    <Section title="Checkbox & Switch">
      <Checkbox label="Accept terms" />
      <Switch checked={switchOn} onCheckedChange={setSwitchOn} label="Toggle" />
    </Section>
  );
}
