"use client";

import { useState } from "react";
import { Button, Drawer } from "@/app/components/ui";
import type { DrawerSide } from "@/app/components/ui";
import { Section } from "@/app/components/ui";

const SIDES: DrawerSide[] = ["left", "right", "top", "bottom"];

export function DrawerSection() {
  const [open, setOpen] = useState(false);
  const [side, setSide] = useState<DrawerSide>("right");

  const handleOpen = (s: DrawerSide) => {
    setSide(s);
    setOpen(true);
  };

  return (
    <Section title="Drawer" description="Opens from left, right, top, or bottom via the side prop.">
      <div className="flex flex-wrap gap-2">
        {SIDES.map((s) => (
          <Button key={s} variant="secondary" onClick={() => handleOpen(s)}>
            Open from {s}
          </Button>
        ))}
      </div>
      <Drawer open={open} onClose={() => setOpen(false)} title="Drawer title" side={side}>
        <p className="text-sm text-gray-600 dark:text-gray-400">Drawer content.</p>
      </Drawer>
    </Section>
  );
}
