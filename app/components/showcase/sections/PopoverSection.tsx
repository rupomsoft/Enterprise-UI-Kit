"use client";

import { useState } from "react";
import { Popover, Button } from "@/app/components/ui";
import { Section } from "@/app/components/ui";

export function PopoverSection() {
  const [open, setOpen] = useState(false);
  return (
    <Section title="Popover">
      <Popover
        open={open}
        onOpenChange={setOpen}
        trigger={<Button variant="secondary">Popover</Button>}
      >
        <p className="text-sm text-gray-700 dark:text-gray-300">Popover content.</p>
      </Popover>
    </Section>
  );
}
