"use client";

import { useState } from "react";
import { Combobox } from "@/app/components/ui";
import { Section } from "@/app/components/ui";

export function ComboboxSection() {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  return (
    <Section title="Combobox" block>
      <div className="w-56">
        <Combobox
          value={value}
          onChange={setValue}
          open={open}
          onOpenChange={setOpen}
          options={["Apple", "Banana", "Cherry"]}
          placeholder="Type or choose..."
          label="Fruit"
        />
      </div>
    </Section>
  );
}
