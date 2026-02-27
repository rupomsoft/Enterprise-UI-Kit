"use client";

import { useState } from "react";
import { Button, DropdownMenu } from "@/app/components/ui";
import { Section } from "@/app/components/ui";

export function DropdownMenuSection() {
  const [open, setOpen] = useState(false);
  return (
    <Section title="DropdownMenu">
      <DropdownMenu
        open={open}
        onOpenChange={setOpen}
        trigger={<Button variant="secondary">Menu</Button>}
        items={[
          { label: "Edit", onClick: () => {} },
          { label: "Delete", variant: "danger", onClick: () => {} },
        ]}
      />
    </Section>
  );
}
